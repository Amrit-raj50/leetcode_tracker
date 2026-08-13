const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // ---------- Authentication ----------
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    // ---------- LeetCode Data ----------
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    profile: {
      realName: { type: String, default: '' },
      aboutMe: { type: String, default: '' },
      userAvatar: { type: String, default: '' },
      ranking: { type: Number, default: 0 },
      countryName: { type: String, default: '' },
      company: { type: String, default: '' },
      school: { type: String, default: '' },
      websites: { type: [String], default: [] },
      starRating: { type: Number, default: 0 },
    },
    contributions: {
      points: { type: Number, default: 0 },
      questionCount: { type: Number, default: 0 },
      testcaseCount: { type: Number, default: 0 },
    },
    submitStats: {
      acSubmissionNum: [
        {
          difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'All'] },
          count: { type: Number, default: 0 },
          submissions: { type: Number, default: 0 },
        },
      ],
      totalSubmissionNum: [
        {
          difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'All'] },
          count: { type: Number, default: 0 },
          submissions: { type: Number, default: 0 },
        },
      ],
    },
    badges: [
      {
        id: String,
        name: String,
        shortName: String,
        displayName: String,
        icon: String,
        hoverText: String,
        medal: {
          slug: String,
          config: {
            iconGif: String,
            iconGifBackground: String,
          },
        },
        creationDate: String,
        category: String,
      },
    ],
    upcomingBadges: [
      {
        name: String,
        icon: String,
        progress: Number,
      },
    ],
    activeBadge: {
      displayName: String,
      icon: String,
    },
    userCalendar: {
      streak: { type: Number, default: 0 },
      totalActiveDays: { type: Number, default: 0 },
      submissionCalendar: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    languageProblemCount: [
      {
        languageName: String,
        problemsSolved: { type: Number, default: 0 },
      },
    ],
    tagProblemCounts: {
      advanced: [
        {
          tagName: String,
          tagSlug: String,
          problemsSolved: { type: Number, default: 0 },
        },
      ],
      intermediate: [
        {
          tagName: String,
          tagSlug: String,
          problemsSolved: { type: Number, default: 0 },
        },
      ],
      fundamental: [
        {
          tagName: String,
          tagSlug: String,
          problemsSolved: { type: Number, default: 0 },
        },
      ],
    },
    recentAcSubmissions: [
      {
        id: String,
        title: String,
        titleSlug: String,
        timestamp: String,
      },
    ],
    solvedQuestions: [
      {
        slug: { type: String, required: true },
        title: { type: String, required: true },
        difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
        frontendId: String,
        topics: [{ name: String, slug: String }],
        link: String,
      },
    ],
    solvedSlugs: { type: [String], default: [] },
    totalSolved: { type: Number, default: 0 },
    platformStats: [
      {
        difficulty: String,
        count: Number,
      },
    ],
    lastSynced: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ---------- 🔥 FIXED: Password hashing (no 'next' error) ----------
userSchema.pre('save', async function () {
  // Only hash if password is modified or new
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ---------- Password comparison ----------
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);