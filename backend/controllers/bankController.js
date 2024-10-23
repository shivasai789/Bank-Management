const BankAccount = require('../models/BankAccount');

// Add Bank Account
exports.addBankAccount = async (req, res) => {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
    try {
        const bankAccount = new BankAccount({
            user: req.user.id,
            ifscCode,
            branchName,
            bankName,
            accountNumber,
            accountHolderName
        });
        await bankAccount.save();
        res.status(201).json({ message: 'Bank account added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get All Bank Accounts for User
exports.getUserBankAccounts = async (req, res) => {
    try {
        const bankAccounts = await BankAccount.find({ user: req.user.id });
        res.json(bankAccounts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update Bank Account
exports.updateBankAccount = async (req, res) => {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
    try {
        const bankAccount = await BankAccount.findById(req.params.id);
        if (!bankAccount || bankAccount.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        bankAccount.ifscCode = ifscCode;
        bankAccount.branchName = branchName;
        bankAccount.bankName = bankName;
        bankAccount.accountNumber = accountNumber;
        bankAccount.accountHolderName = accountHolderName;
        await bankAccount.save();
        res.json({ message: 'Bank account updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete Bank Account
exports.deleteBankAccount = async (req, res) => {
    try {
        // Find the bank account by its ID
        const bankAccount = await BankAccount.findById(req.params.id);
        
        // console.log("Params ID:", req.params.id);
        // console.log("User ID from request:", req.user.id);
        // console.log("Bank account owner ID:", bankAccount.user.toString());

        // Check if bank account exists and if the logged-in user is the owner
        if (!bankAccount || bankAccount.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Delete the bank account
        await BankAccount.deleteOne({ _id: req.params.id });

        // Respond with success
        res.json({ message: 'Bank account removed successfully' });
    } catch (error) {
        console.error("Error deleting bank account:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

