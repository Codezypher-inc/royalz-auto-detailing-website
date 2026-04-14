import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetMsg, setResetMsg] = useState("");
  const navigate = useNavigate();
  const {
    isAdmin,
    isLoading,
    isRecoveryMode,
    signInAsAdmin,
    sendPasswordResetEmail,
    updateAdminPassword,
  } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && isAdmin && !isRecoveryMode) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [isAdmin, isLoading, isRecoveryMode, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMsg("");
    setLoading(true);

    try {
      await signInAsAdmin({
        email,
        password,
      });

      navigate("/admin-dashboard", { replace: true });
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

      await sendPasswordResetEmail(email, `${redirectBase}/admin-login`);
      setResetMsg("Password reset email sent. Check your inbox.");
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setResetMsg("");

    if (password.length < 8) {
      setError("Use at least 8 characters for the new password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await updateAdminPassword(password);
      setResetMsg("Password updated successfully.");
      navigate("/admin-dashboard", { replace: true });
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-5" style={{ maxWidth: 480 }}>
        <div className="alert alert-info">Checking your admin session...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">
        {isRecoveryMode ? "Set A New Password" : "Admin Login"}
      </h2>
      {isRecoveryMode ? (
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {resetMsg && <div className="alert alert-success">{resetMsg}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Saving..." : "Update Password"}
          </button>
        </form>
      ) : !resetMode ? (
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
