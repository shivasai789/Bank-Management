const express = require('express');
const { viewAllBankInfo, searchBankAccounts } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/all', authMiddleware, viewAllBankInfo);
router.get('/search', authMiddleware, searchBankAccounts);

module.exports = router;
