require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const syncRoutes = require('./src/routes/sync');
const mongoose = require('mongoose');
const cors = require('cors');
const leetcodeRoutes = require('./src/routes/leetCodeRoutes');

const app = express();
app.use(express.json());

app.use(cors()); // or configure with specific origins

// ---------- Connect to MongoDB ----------
connectDB();
mongoose.connection.once('open', () => {
    console.log('✅ Connected to database:', mongoose.connection.db.databaseName);
});
// ---------- Drop stale indexes after connection opens ----------

mongoose.connection.once('open', async () => {
    try {
        await mongoose.connection.collection('users').dropIndex('email_1');
        console.log('✅ Dropped stale email index');
    } catch (e) {
        // index probably doesn't exist
    }
    try {
        await mongoose.connection.collection('users').dropIndex('name_1');
        console.log('✅ Dropped stale name index');
    } catch (e) {
        // index probably doesn't exist
    }
});

// ---------- Routes ----------
app.use('/api/auth', authRoutes);
app.use('/api', syncRoutes);
app.use('/api/leetcode', leetcodeRoutes);

module.exports = app;