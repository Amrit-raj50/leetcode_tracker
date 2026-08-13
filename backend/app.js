require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const leetcodeRoutes = require('./src/routes/leetCodeRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/leetcode',leetcodeRoutes);

module.exports = app;