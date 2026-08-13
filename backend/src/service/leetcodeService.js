const axios = require('axios');
const User = require('../models/User');

const LEETCODE_QUERY = `
query getUserProfile($username : String!){
matchedUser(username : $username){
username
submitStats : submitStatsGlobal{
asSubmissionNum {
difficulty
count
}}}}`;

async function fetchAndSaveUser(username) {
    try{
        const response = await axios.post('https://leetcode.com/graphql',{
            query : LEETCODE_QUERY,
            variables : {username},
        });

        const data = response.data.data.matchedUser;
        if(!data){
            throw new Error(`User ${username} not found on Leetcode`);
        }

        const stats = data.submitStats.acSubmissionNum;
        const solvedCounts = {
            totalSolved: stats.find(s => s.difficulty === 'All')?.count||0,
            easySolved:stats.find(s => s.difficulty === 'Easy')?.count || 0,
            mediumSolved:stats.find(s => s.difficulty === 'Medium')?.count || 0,
            hardSolved:stats.find(s => s.difficulty === 'Hard')?.cont || 0,
        };

        const updateUser = await User.findOneAndUpdate(
            {username},
            {...solvedCounts,LastSynced : new date()},
            {new:true , upsert : true}
        );

        console.log(`Synced ${username} : `, solvedCounts);
        return updateUser;
    } catch (error){
        console.log(`Error syncing ${usename} :`,error.message);
        throw error;
    }
}

module.exports = {fetchAndSaveUser};