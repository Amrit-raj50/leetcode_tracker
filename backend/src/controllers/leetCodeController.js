const {fetchAndSaveUser} = require('../service/leetcodeService');

exports.syncUser = async (req,res) => {
    const {username} = req.body;

    if(!username){
        return res.status(400).json({error : 'Username is required'});
    }

    try{
        const user = await fetchAndSaveUser(username);
        res.json({message : 'Sync Successful',user})
    }catch (error) {
        res.status(500).json({error : error.message});
    }
}