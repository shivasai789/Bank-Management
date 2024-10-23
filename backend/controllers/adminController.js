const BankAccount = require('../models/BankAccount');

// Get All Users' Bank Information (Admin)
exports.viewAllBankInfo = async (req, res) => {
    try {
        const bankAccounts = await BankAccount.find().populate('user', 'username email');
        res.json(bankAccounts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Search Functionality (Admin)
exports.searchBankAccounts = async (req, res) => {
    const query = req.query.query;
    // console.log(req.query)
    try {
        const accounts = await BankAccount.find({
            $or: [
                { accountHolderName: { $regex: query, $options: 'i' } },
                { bankName: { $regex: query, $options: 'i' } }
            ]
        }).populate('user', 'username email');
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
