import React, { useEffect, useState } from "react";
import axios from "axios";

const BankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
  });
  const [editingAccount, setEditingAccount] = useState(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  // Fetch Bank Accounts
  const fetchBankAccounts = async () => {
    try {
      const res = await axios.get("https://bank-management-tfeo.onrender.com/api/banks", config);
      setBankAccounts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle input changes for adding/editing form
  const handleChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  // Add Bank Account
  const handleAddBankAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://bank-management-tfeo.onrender.com/api/banks",
        newAccount,
        config
      );
      console.log("New account added:", res.data); // Log the response data
      setBankAccounts((prevAccounts) => [...prevAccounts, res.data]); // Update the state
      setNewAccount({
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        branchName: "",
      }); // Clear the form
    } catch (error) {
      console.error(error);
    }
    fetchBankAccounts();
  };

  // Edit Bank Account
  const handleEditBankAccount = (account) => {
    setEditingAccount(account);
    setNewAccount({
      bankName: account.bankName,
      accountHolderName: account.accountHolderName,
      accountNumber: account.accountNumber,
      ifscCode: account.ifscCode,
      branchName: account.branchName,
    });
  };

  const handleUpdateBankAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://bank-management-tfeo.onrender.com/api/banks/${editingAccount._id}`,
        newAccount,
        config
      );
      const updatedAccounts = bankAccounts.map((account) =>
        account._id === res.data._id ? res.data : account
      );
      setBankAccounts(updatedAccounts);
      setEditingAccount(null);
      setNewAccount({
        bankName: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        branchName: "",
      }); // Clear the form
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Bank Account
  const handleDeleteBankAccount = async (accountId) => {
    try {
      await axios.delete(
        `https://bank-management-tfeo.onrender.com/api/banks/${accountId}`,
        config
      );
      setBankAccounts(
        bankAccounts.filter((account) => account._id !== accountId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Bank Accounts</h2>

      {/* Add/Edit Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form
            onSubmit={
              editingAccount ? handleUpdateBankAccount : handleAddBankAccount
            }
          >
            <div className="form-group">
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={newAccount.bankName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Account Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={newAccount.accountHolderName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={newAccount.accountNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={newAccount.ifscCode}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Branch Name</label>
              <input
                type="text"
                name="branchName"
                value={newAccount.branchName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingAccount ? "Update Account" : "Add Account"}
            </button>
          </form>
        </div>
      </div>

      {/* List of Bank Accounts */}
      <div className="row">
        {bankAccounts.map((account) => (
          <div key={account._id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{account.bankName}</h5>
                <p className="card-text">
                  Account Holder: {account.accountHolderName}
                  <br />
                  Account Number: {account.accountNumber}
                  <br />
                  IFSC Code: {account.ifscCode}
                  <br />
                  Branch: {account.branchName}
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditBankAccount(account)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDeleteBankAccount(account._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankAccounts;
