const axios = require('axios');
const User = require('../models/User');
const puppeteer = require('puppeteer');

// ---------- GraphQL Query 1: Full Profile ----------
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

// ---------- Improved Scraping Function ----------
async function scrapeSolvedQuestions(username) {
  console.log(`🕷️ Scraping LeetCode solved page for ${username}...`);
  let browser;
  const urls = [
    `https://leetcode.com/u/${username}/`,
    `https://leetcode.com/${username}/`,
  ];

  for (const url of urls) {
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();

      // Set a user agent to avoid blocking
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );

      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Wait for the "Solved Problems" section
      await page.waitForSelector('div[role="tablist"]', { timeout: 10000 }).catch(() => {});

      // Click on the "Solved" tab if it exists
      try {
        await page.click('button[role="tab"]:has-text("Solved")');
        await page.waitForTimeout(2000);
      } catch (e) {
        // Tab might not exist or already active
      }

      // Scroll to load all problems
      let previousHeight = 0;
      let attempts = 0;
      while (attempts < 20) {
        const newHeight = await page.evaluate(() => document.body.scrollHeight);
        if (newHeight === previousHeight) break;
        previousHeight = newHeight;
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise((resolve) => setTimeout(resolve, 1500));
        attempts++;
      }

      // Extract slugs from links
      const slugs = await page.evaluate(() => {
        const links = document.querySelectorAll('a[href*="/problems/"]');
        const slugsSet = new Set();
        links.forEach((link) => {
          const match = link.href.match(/\/problems\/([^/]+)/);
          if (match) {
            slugsSet.add(match[1]);
          }
        });
        return Array.from(slugsSet);
      });

      if (slugs.length > 0) {
        console.log(`✅ Scraped ${slugs.length} solved questions from ${url}`);
        return slugs;
      }
    } catch (error) {
      console.warn(`⚠️ Scraping failed for ${url}:`, error.message);
    } finally {
      if (browser) await browser.close();
    }
  }

  console.warn('❌ All scraping attempts failed.');
  return [];
}

// ---------- Main Fetch & Save ----------
async function fetchAndSaveUser(username) {
  try {
    // 1. Fetch Profile via GraphQL
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
    if (!profileData) throw new Error(`User "${username}" not found on LeetCode.`);

    const recentSubmissions = profileResponse.data.data.recentAcSubmissionList || [];
    const platformStats = profileResponse.data.data.allQuestionsCount || [];

    // ---------- 2. Get All Solved Slugs ----------
    let solvedSlugs = [];
    let totalSolved = 0;
    let source = '';

    // --- Try #1: Scrape from LeetCode ---
    solvedSlugs = await scrapeSolvedQuestions(username);
    if (solvedSlugs.length > 0) {
      totalSolved = solvedSlugs.length;
      source = 'Web Scraping (Puppeteer)';
      console.log(`✅ Web Scraping: ${solvedSlugs.length} slugs`);
    }

    // --- Try #2: HeroKu API ---
    if (solvedSlugs.length === 0) {
      try {
        const statsRes = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/${username}`,
          { timeout: 5000 }
        );
        if (statsRes.data?.status === 'success') {
          solvedSlugs = statsRes.data.acSubmissionList || [];
          totalSolved = statsRes.data.totalSolved || solvedSlugs.length;
          source = 'HeroKu API';
          console.log(`✅ HeroKu API: ${solvedSlugs.length} slugs`);
        }
      } catch (e) {
        console.warn('⚠️ HeroKu API failed, trying Faisal API...');
      }
    }

    // --- Try #3: Faisal API ---
    if (solvedSlugs.length === 0) {
      try {
        const statsRes = await axios.get(
          `https://leetcode-api-faisalshohag.vercel.app/${username}`,
          { timeout: 5000 }
        );
        if (statsRes.data?.status === 'success') {
          solvedSlugs = statsRes.data.acSubmissionList || statsRes.data.submissions || [];
          totalSolved = statsRes.data.totalSolved || statsRes.data.total || solvedSlugs.length;
          source = 'Faisal API';
          console.log(`✅ Faisal API: ${solvedSlugs.length} slugs`);
        }
      } catch (e) {
        console.warn('⚠️ Faisal API failed, trying GraphQL...');
      }
    }

    // --- Try #4: GraphQL (userProgressQuestionList) ---
    if (solvedSlugs.length === 0) {
      try {
        const gqlRes = await axios.post(
          'https://leetcode.com/graphql',
          {
            query: `
              query getAllSolvedQuestions($username: String!) {
                userProgressQuestionList(
                  first: 10000
                  skip: 0
                  filters: { user: $username, status: "AC" }
                ) {
                  total
                  questions {
                    question { titleSlug }
                  }
                }
              }
            `,
            variables: { username },
            operationName: 'getAllSolvedQuestions',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'Mozilla/5.0',
              'Referer': 'https://leetcode.com/',
            },
            timeout: 10000,
          }
        );
        const data = gqlRes.data.data?.userProgressQuestionList;
        if (data && data.questions) {
          solvedSlugs = data.questions.map((q) => q.question.titleSlug);
          totalSolved = data.total || solvedSlugs.length;
          source = 'GraphQL (userProgressQuestionList)';
          console.log(`✅ GraphQL: ${solvedSlugs.length} slugs`);
        }
      } catch (e) {
        console.warn('⚠️ GraphQL failed, falling back to recent submissions...');
      }
    }

    // --- Final fallback: recent submissions (limit 200) ---
    if (solvedSlugs.length === 0) {
      try {
        const recentRes = await axios.post(
          'https://leetcode.com/graphql',
          {
            query: `
              query recent($username: String!) {
                recentAcSubmissionList(username: $username, limit: 200) {
                  titleSlug
                }
              }
            `,
            variables: { username },
            operationName: 'recent',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'Mozilla/5.0',
              'Referer': 'https://leetcode.com/',
            },
          }
        );
        const slugs = recentRes.data.data?.recentAcSubmissionList?.map((s) => s.titleSlug) || [];
        solvedSlugs = slugs;
        totalSolved = slugs.length;
        source = 'GraphQL recent (limit 200)';
        console.log(`✅ Recent fallback: ${solvedSlugs.length} slugs`);
        if (solvedSlugs.length === 20) {
          console.warn(
            '⚠️ Note: recentAcSubmissionList is often capped at 20. ' +
            'You may not have all your solved questions.'
          );
        }
      } catch (e) {
        console.error('❌ All methods to fetch solved questions have failed.');
      }
    }

    // ---------- Print the full array ----------
    console.log('🟢 All Solved Question Slugs:');
    console.log(solvedSlugs);

    // ---------- 3. Build the solved questions array ----------
    const solvedList = solvedSlugs.map((slug) => ({
      slug,
      title: '',
      difficulty: '',
      frontendId: '',
      topics: [],
      link: `https://leetcode.com/problems/${slug}/`,
    }));

    // ---------- 4. Build the complete update payload ----------
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
      solvedSlugs: solvedSlugs,
      totalSolved: totalSolved,
      platformStats: platformStats,
      lastSynced: new Date(),
    };

    // ---------- 5. Upsert to MongoDB ----------
    const updatedUser = await User.findOneAndUpdate(
      { username },
      updatePayload,
      { returnDocument: 'after', upsert: true }
    );

    console.log(`✅ Synced ${username}: ${solvedSlugs.length} questions (source: ${source}).`);
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