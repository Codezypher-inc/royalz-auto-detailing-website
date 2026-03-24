
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Dummy customer data
const customers = [
  {
    name: "John Doe",
    email: "john@example.com",
    bookingType: "Full Detailing",
    date: "2026-03-20",
    time: "10:00 AM",
    details: "Sedan, Black, Interior+Exterior"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    bookingType: "Express Wash",
    date: "2026-03-21",
    time: "2:30 PM",
    details: "SUV, White, Exterior Only"
  },
  {
    name: "Mike Brown",
    email: "mike@example.com",
    bookingType: "Ceramic Coating",
    date: "2026-03-22",
    time: "9:00 AM",
    details: "Coupe, Red, Premium Package"
  }
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [email, setEmail] = useState("admin@example.com");
  const [editMode, setEditMode] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  // Sidebar menu items
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fas fa-home" },
    { key: "recent", label: "Recent Customers", icon: "fas fa-users" },
    { key: "email", label: "Email Recipient", icon: "fas fa-envelope" }
  ];

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <div className="row" style={{ minHeight: "100vh" }}>
        {/* Sidebar: always vertical, no extra space on mobile */}
        <aside
          className="col-12 col-md-3 bg-white p-0 shadow-sm"
          style={{ minHeight: undefined }}
        >
          {/* On desktop, set minHeight: 100vh via media query */}
          <style>{`
            @media (min-width: 768px) {
              .admin-sidebar-fullheight { min-height: 100vh !important; }
            }
          `}</style>
          <div className="admin-sidebar-fullheight">
          <div className="d-flex flex-column align-items-center align-items-md-stretch border-bottom p-3">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                <i className="fas fa-bolt"></i>
              </div>
              <span className="ms-2 fw-bold d-none d-md-inline">Thecodude</span>
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
                <i className={`${item.icon} me-2`}></i>{item.label}
              </li>
            ))}
          </ul>
          </div>
        </aside>
        <main className="col-12 col-md-9 p-3 p-md-4">
          {activeMenu === "dashboard" && (
            <>
              <h1 className="mb-4">Dashboard</h1>
              <div className="row g-4 mb-4">
                <div className="col-md-3 col-6">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary">Total Customers</span>
                      <span className="bg-primary text-white rounded p-2"><i className="fas fa-users"></i></span>
                    </div>
                    <h3>{customers.length}</h3>
                  </div>
                </div>
                {/* Add more widgets here if needed */}
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Booking Type</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c, i) => (
                      <tr key={i}>
                        <td>{c.name}</td>
                        <td>{c.email}</td>
                        <td>{c.bookingType}</td>
                        <td>{c.date}</td>
                        <td>{c.time}</td>
                        <td>{c.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeMenu === "email" && (
            <div className="bg-white p-4 rounded shadow-sm mb-4" style={{ maxWidth: 400 }}>
              <h5 className="mb-3">Email Recipient</h5>
              {!editMode ? (
                <div className="d-flex align-items-center justify-content-between">
                  <span>{email}</span>
                  <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => { setEditMode(true); setTempEmail(email); }}>Edit</button>
                </div>
              ) : (
                <form
                  className="d-flex align-items-center"
                  onSubmit={e => { e.preventDefault(); setEmail(tempEmail); setEditMode(false); }}
                >
                  <input
                    type="email"
                    className="form-control me-2"
                    value={tempEmail}
                    onChange={e => setTempEmail(e.target.value)}
                    required
                  />
                  <button className="btn btn-sm btn-success me-2" type="submit">Save</button>
                  <button className="btn btn-sm btn-secondary" type="button" onClick={() => setEditMode(false)}>Cancel</button>
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
