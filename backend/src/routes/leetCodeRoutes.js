const express = require('express');
const {syncUser} = require('../controllers/leetCodeController');
const router = express.Router();

router.post('/sync',syncUser);

module.exports = router;