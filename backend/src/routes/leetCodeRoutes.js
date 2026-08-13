const express = require('express');
const {syncUser} = require('../controllers/leetCodeController');
const route = express.Router();

router.post('/sync',syncUser);

module.exports = router;