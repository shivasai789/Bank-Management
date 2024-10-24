import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://bank-management-tfeo.onrender.com/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      setEmail("");
      setPassword("");
      setError(null);
      setSuccess("Login successful! Redirecting to your accounts...");
      setTimeout(() => {
        setSuccess(null);
        navigate("/bank-accounts");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (localStorage.getItem("token") !== null) {
    return <Navigate to="/bank-accounts" />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center">Login</h2>
              {/* Display success message */}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Login"}
                </button>
                {/* Display error message */}
                {error && (
                  <div className="alert alert-danger mt-4">{error}</div>
                )}
              </form>
              {/* Display loading component */}
              {isLoading && <Loading />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
