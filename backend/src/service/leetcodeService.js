const axios = require('axios');
const User = require('../models/User');

// ---------- Query 1: Full Profile ----------
const LEETCODE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        realName
        aboutMe
        userAvatar
        ranking
        countryName
        company
        school
        websites
        starRating
      }
      contributions {
        points
        questionCount
        testcaseCount
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      badges {
        id
        name
        shortName
        displayName
        icon
        hoverText
        medal {
          slug
          config {
            iconGif
            iconGifBackground
          }
        }
        creationDate
        category
      }
      upcomingBadges {
        name
        icon
        progress
      }
      activeBadge {
        displayName
        icon
      }
      userCalendar {
        streak
        totalActiveDays
        submissionCalendar
      }
      languageProblemCount {
        languageName
        problemsSolved
      }
      tagProblemCounts {
        advanced {
          tagName
          tagSlug
          problemsSolved
        }
        intermediate {
          tagName
          tagSlug
          problemsSolved
        }
        fundamental {
          tagName
          tagSlug
          problemsSolved
        }
      }
    }
    recentAcSubmissionList(username: $username, limit: 20) {
      id
      title
      titleSlug
      timestamp
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

// ---------- Query 2: All Solved Questions (trying the most common syntax) ----------
const ALL_SOLVED_QUERY = `
  query getAllSolvedQuestions($username: String!) {
    userProgressQuestionList(
      first: 10000
      skip: 0
      filters: { user: $username, status: "AC" }
    ) {
      total
      questions {
        question {
          questionFrontendId
          title
          titleSlug
          difficulty
          topicTags {
            name
            slug
          }
        }
        status
      }
    }
  }
`;

async function fetchAndSaveUser(username) {
  try {
    // 1. Fetch Full Profile
    const profileResponse = await axios.post(
      'https://leetcode.com/graphql',
      {
        query: LEETCODE_QUERY,
        variables: { username },
        operationName: 'getUserProfile',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://leetcode.com/',
        },
      }
    );

    const profileData = profileResponse.data.data.matchedUser;
    if (!profileData) {
      throw new Error(`User "${username}" not found on LeetCode.`);
    }

    // 2. Fetch All Solved Questions – with graceful fallback
    let solvedList = [];
    let totalSolved = 0;
    try {
      const solvedResponse = await axios.post(
        'https://leetcode.com/graphql',
        {
          query: ALL_SOLVED_QUERY,
          variables: { username },
          operationName: 'getAllSolvedQuestions',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://leetcode.com/',
          },
        }
      );

      // If the query works, extract the data
      const solvedData = solvedResponse.data.data?.userProgressQuestionList;
      if (solvedData) {
        const questions = solvedData.questions || [];
        solvedList = questions.map((item) => ({
          slug: item.question.titleSlug,
          title: item.question.title,
          difficulty: item.question.difficulty,
          frontendId: item.question.questionFrontendId,
          topics: item.question.topicTags || [],
          link: `https://leetcode.com/problems/${item.question.titleSlug}/`,
        }));
        totalSolved = solvedData.total || solvedList.length;
        console.log(`📚 Fetched ${totalSolved} solved questions for ${username}`);
      }
    } catch (solvedError) {
      // If the solved query fails, log it but continue with profile data
      console.warn('⚠️ Could not fetch solved questions. Continuing with profile only.');
      console.warn(solvedError.message);
    }

    // 3. Extract extras
    const recentSubmissions = profileResponse.data.data.recentAcSubmissionList || [];
    const platformStats = profileResponse.data.data.allQuestionsCount || [];

    // 4. Build update payload
    const updatePayload = {
      username: profileData.username,
      profile: profileData.profile || {},
      contributions: profileData.contributions || {},
      submitStats: profileData.submitStats || { acSubmissionNum: [], totalSubmissionNum: [] },
      badges: profileData.badges || [],
      upcomingBadges: profileData.upcomingBadges || [],
      activeBadge: profileData.activeBadge || {},
      userCalendar: {
        streak: profileData.userCalendar?.streak || 0,
        totalActiveDays: profileData.userCalendar?.totalActiveDays || 0,
        submissionCalendar: profileData.userCalendar?.submissionCalendar || {},
      },
      languageProblemCount: profileData.languageProblemCount || [],
      tagProblemCounts: profileData.tagProblemCounts || {
        advanced: [],
        intermediate: [],
        fundamental: [],
      },
      recentAcSubmissions: recentSubmissions,
      solvedQuestions: solvedList,
      solvedSlugs: solvedList.map((q) => q.slug),
      totalSolved: solvedList.length,
      platformStats: platformStats,
      lastSynced: new Date(),
    };

    // 5. Upsert to MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { username },
      updatePayload,
      { new: true, upsert: true }
    );

    console.log(`✅ Synced ${username}: ${solvedList.length} questions.`);
    return updatedUser;
  } catch (error) {
    if (error.response) {
      console.error('❌ LeetCode API error:', {
        status: error.response.status,
        data: JSON.stringify(error.response.data, null, 2),
      });
      throw new Error(
        `LeetCode API error: ${error.response.status} – ${
          error.response.data?.errors?.[0]?.message || 'Unknown error'
        }`
      );
    } else if (error.request) {
      console.error('❌ No response from LeetCode');
      throw new Error('LeetCode API is not responding.');
    } else {
      console.error('❌ Internal error:', error.message);
      throw error;
    }
  }
}

module.exports = { fetchAndSaveUser };