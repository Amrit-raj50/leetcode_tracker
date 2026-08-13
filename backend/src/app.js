const express = require('express');
const mongoose = require('mongoose');
const leetcodeRoutes = require('./routes/leetCodeRoutes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true , useUnifiedTopology : true});

app.use('/api/leetcode',leetcodeRoutes);

module.exports = app;