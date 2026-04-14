import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../lib/api";
import { useAdminAuth } from "../context/AdminAuthContext";

function formatStatusLabel(status) {
  if (!status) {
    return "Unknown";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusBadgeClass(status) {
  switch (status) {
    case "confirmed":
      return "bg-primary-subtle text-primary";
    case "completed":
      return "bg-success-subtle text-success";
    case "cancelled":
      return "bg-danger-subtle text-danger";
    default:
      return "bg-warning-subtle text-warning";
  }
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [email, setEmail] = useState("admin@example.com");
  const [editMode, setEditMode] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { adminUser, isAdmin, isLoading, session, signOutAdmin } = useAdminAuth();

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      if (isLoading) {
        return;
      }

      if (!isAdmin || !session?.access_token) {
        navigate("/admin-login", { replace: true });
        return;
      }

      setLoading(true);

      try {
        const response = await apiGet("/api/admin/dashboard", session.access_token);

        if (!isMounted) {
          return;
        }

        setCustomers(response.customers || []);
        setStats(
          response.stats || {
            total: 0,
            pending: 0,
            confirmed: 0,
            completed: 0,
            cancelled: 0,
          }
        );
        setEmail(response.emailRecipient || "admin@example.com");
        setTempEmail(response.emailRecipient || "admin@example.com");
      } catch (apiError) {
        if (!isMounted) {
          return;
        }

        setError(apiError.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [isAdmin, isLoading, navigate, session?.access_token]);

  const handleLogout = async () => {
    try {
      await signOutAdmin();
    } catch (apiError) {
      console.error(apiError);
    }

    navigate("/", { replace: true });
  };

  const handleEmailSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiPut(
        "/api/admin/email-recipient",
        { email: tempEmail },
        session?.access_token
      );

      setEmail(response.emailRecipient);
      setTempEmail(response.emailRecipient);
      setEditMode(false);
    } catch (apiError) {
      setError(apiError.message);
    }
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fas fa-home" },
    { key: "recent", label: "Recent Bookings", icon: "fas fa-calendar-check" },
    { key: "email", label: "Email Recipient", icon: "fas fa-envelope" },
  ];

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <div className="row" style={{ minHeight: "100vh" }}>
        <aside className="col-12 col-md-3 bg-white p-0 shadow-sm" style={{ minHeight: undefined }}>
          <style>{`
            @media (min-width: 768px) {
              .admin-sidebar-fullheight { min-height: 100vh !important; }
            }
          `}</style>
          <div className="admin-sidebar-fullheight">
            <div className="d-flex flex-column align-items-center align-items-md-stretch border-bottom p-3">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40 }}
                >
                  <i className="fas fa-bolt"></i>
                </div>
                <span className="ms-2 fw-bold d-none d-md-inline">Royalz Admin</span>
              </div>
              <div className="small text-muted text-center text-md-start">
                {adminUser?.email || "Admin session"}
              </div>
              <button className="btn btn-outline-danger btn-sm w-100 mt-2" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            </div>
            <ul className="nav flex-column p-3">
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  className={`nav-item mb-2 ${activeMenu === item.key ? "fw-bold text-primary" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveMenu(item.key)}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="col-12 col-md-9 p-3 p-md-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="alert alert-info">Loading dashboard...</div>}
          {activeMenu === "dashboard" && (
            <>
              <h1 className="mb-4">Dashboard</h1>
              <div className="row g-4 mb-4">
                <div className="col-md-3 col-6">
                  <div className="bg-white p-4 rounded shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary">Total Bookings</span>
                      <span className="bg-primary text-white rounded p-2">
                        <i className="fas fa-calendar-check"></i>
                      </span>
                    </div>
                    <h3>{stats.total}</h3>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="bg-white p-4 rounded shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary">Pending</span>
                      <span className="bg-warning text-dark rounded p-2">
                        <i className="fas fa-hourglass-half"></i>
                      </span>
                    </div>
                    <h3>{stats.pending || 0}</h3>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="bg-white p-4 rounded shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary">Confirmed</span>
                      <span className="bg-primary text-white rounded p-2">
                        <i className="fas fa-check"></i>
                      </span>
                    </div>
                    <h3>{stats.confirmed || 0}</h3>
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="bg-white p-4 rounded shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary">Completed</span>
                      <span className="bg-success text-white rounded p-2">
                        <i className="fas fa-flag-checkered"></i>
                      </span>
                    </div>
                    <h3>{stats.completed || 0}</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow-sm">
                <h5 className="mb-3">Latest Booking Requests</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Reference</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.slice(0, 5).map((customer) => (
                        <tr key={customer.id}>
                          <td>{customer.reference}</td>
                          <td>
                            <div>{customer.name}</div>
                            <div className="small text-muted">{customer.email}</div>
                          </td>
                          <td>
                            <div>{customer.bookingType}</div>
                            <div className="small text-muted">{customer.serviceCategory}</div>
                          </td>
                          <td>{customer.date} / {customer.time}</td>
                          <td>
                            <span className={`badge ${statusBadgeClass(customer.status)}`}>
                              {formatStatusLabel(customer.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {customers.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-4">
                            No bookings have been submitted yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          {activeMenu === "recent" && (
            <div className="bg-white p-3 rounded shadow-sm mb-4">
              <h5 className="mb-3">Recent Customer Bookings</h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Reference</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Booking Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.reference}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>
                          <div>{customer.bookingType}</div>
                          <div className="small text-muted">{customer.serviceCategory}</div>
                        </td>
                        <td>{customer.date} / {customer.time}</td>
                        <td>
                          <span className={`badge ${statusBadgeClass(customer.status)}`}>
                            {formatStatusLabel(customer.status)}
                          </span>
                        </td>
                        <td>{customer.details}</td>
                      </tr>
                    ))}
                    {customers.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-4">
                          No bookings have been submitted yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeMenu === "email" && (
            <div className="bg-white p-4 rounded shadow-sm mb-4" style={{ maxWidth: 400 }}>
              <h5 className="mb-3">Email Recipient</h5>
              <p className="text-muted">
                This address is now stored in Supabase, so it stays consistent across
                backend restarts and deployments.
              </p>
              {!editMode ? (
                <div className="d-flex align-items-center justify-content-between">
                  <span>{email}</span>
                  <button
                    className="btn btn-sm btn-outline-primary ms-2"
                    onClick={() => {
                      setEditMode(true);
                      setTempEmail(email);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <form className="d-flex align-items-center" onSubmit={handleEmailSave}>
                  <input
                    type="email"
                    className="form-control me-2"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    required
                  />
                  <button className="btn btn-sm btn-success me-2" type="submit">
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    type="button"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
