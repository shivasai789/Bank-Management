const express = require('express');
const { addBankAccount, getUserBankAccounts, updateBankAccount, deleteBankAccount } = require('../controllers/bankController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addBankAccount);
router.get('/', authMiddleware, getUserBankAccounts);
router.put('/:id', authMiddleware, updateBankAccount);
router.delete('/:id', authMiddleware, deleteBankAccount);

module.exports = router;
