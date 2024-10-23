import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [query, setQuery] = useState("");

  const fetchAllAccounts = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const res = await axios.get(
        "https://bank-management-tfeo.onrender.com/api/admin/all",
        config
      );
      setAccounts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const res = await axios.get(
        `https://bank-management-tfeo.onrender.com/api/admin/search?query=${query}`,
        config
      );
      setAccounts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Bank Name or Account Holder"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
      <div className="row mt-4">
        {accounts.map((account) => (
          <div key={account._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{account.bankName}</h5>
                <p className="card-text">
                  <strong>User:</strong> {account.user.username} (
                  {account.user.email})<br />
                  <strong>Account Holder:</strong> {account.accountHolderName}
                  <br />
                  <strong>IFSC Code:</strong> {account.ifscCode}
                  <br />
                  <strong>Branch:</strong> {account.branchName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
