import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../lib/api";
import { saveAdminSession } from "../lib/adminSession";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetMsg, setResetMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMsg("");
    setLoading(true);
    try {
      const response = await apiPost("/api/auth/login", {
        email,
        password,
      });

      saveAdminSession({
        accessToken: response.session.access_token,
        refreshToken: response.session.refresh_token,
        expiresAt: response.session.expires_at,
        user: response.user,
      });

      navigate("/");
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setResetMsg("");
    setLoading(true);
    try {
      const redirectBase =
        process.env.REACT_APP_PUBLIC_SITE_URL || window.location.origin;

      await apiPost("/api/auth/reset-password", {
        email,
        redirectTo: `${redirectBase}/admin-login`,
      });

      setResetMsg("Password reset email sent. Check your inbox.");
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">Admin Login</h2>
      {!resetMode ? (
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-end mt-2">
            <button type="button" className="btn btn-link p-0" onClick={() => setResetMode(true)}>
              Forgot Password?
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {resetMsg && <div className="alert alert-success">{resetMsg}</div>}
          <button type="submit" className="btn btn-warning w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <div className="text-end mt-2">
            <button type="button" className="btn btn-link p-0" onClick={() => setResetMode(false)}>
              Back to Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminLogin;
