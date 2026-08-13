const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        unique:true,
        required:true
    },
    totalSolved : true,
    easySolved : Number,
    mediumSolved : Number,
    hardSolved : Number,
    LastSynced : {
        type: Date,
        default : Date.now
    },
})

module.exports = mongoose.model('User',userSchema);