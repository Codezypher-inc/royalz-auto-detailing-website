
import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <div className="row">
        <aside className="col-md-3 bg-white p-0 shadow-sm" style={{ minHeight: "100vh" }}>
          <div className="p-4 border-bottom">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                <i className="fas fa-bolt"></i>
              </div>
              <span className="ms-2 fw-bold">Thecodude</span>
            </div>
            <button className="btn btn-outline-danger w-100 mt-3" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>Logout
            </button>
          </div>
          <ul className="nav flex-column p-3">
            <li className="nav-item mb-2"><i className="fas fa-home me-2"></i>Dashboard</li>
            <li className="nav-item mb-2"><i className="fas fa-chart-line me-2"></i>Analytics</li>
            <li className="nav-item mb-2"><i className="fas fa-shopping-cart me-2"></i>Orders <span className="badge bg-primary ms-2">12</span></li>
            <li className="nav-item mb-2"><i className="fas fa-box me-2"></i>Products</li>
            <li className="nav-item mb-2"><i className="fas fa-users me-2"></i>Customers</li>
            <li className="nav-item mb-2"><i className="fas fa-cog me-2"></i>Settings</li>
            <li className="nav-item mb-2"><i className="fas fa-user-shield me-2"></i>User Roles</li>
            <li className="nav-item mb-2"><i className="fas fa-bell me-2"></i>Notifications <span className="badge bg-danger ms-2">5</span></li>
            <li className="nav-item mb-2"><i className="fas fa-file-alt me-2"></i>Reports</li>
            <li className="nav-item mb-2"><i className="fas fa-question-circle me-2"></i>Help Center</li>
            <li className="nav-item mb-2"><i className="fas fa-headset me-2"></i>Contact Support</li>
            <li className="nav-item mb-2"><i className="fas fa-book me-2"></i>Documentation</li>
          </ul>
        </aside>
        <main className="col-md-9 p-4">
          <h1 className="mb-4">Dashboard</h1>
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary">Total Revenue</span>
                  <span className="bg-primary text-white rounded p-2"><i className="fas fa-dollar-sign"></i></span>
                </div>
                <h3>$24,680</h3>
                <span className="text-success"><i className="fas fa-arrow-up"></i> 12.5% from last month</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary">New Customers</span>
                  <span className="bg-secondary text-white rounded p-2"><i className="fas fa-users"></i></span>
                </div>
                <h3>1,482</h3>
                <span className="text-success"><i className="fas fa-arrow-up"></i> 8.2% from last month</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary">Total Orders</span>
                  <span className="bg-success text-white rounded p-2"><i className="fas fa-shopping-bag"></i></span>
                </div>
                <h3>3,594</h3>
                <span className="text-success"><i className="fas fa-arrow-up"></i> 5.7% from last month</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary">Conversion Rate</span>
                  <span className="bg-warning text-white rounded p-2"><i className="fas fa-chart-pie"></i></span>
                </div>
                <h3>3.6%</h3>
                <span className="text-danger"><i className="fas fa-arrow-down"></i> 1.2% from last month</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-sm">
            <h5>Revenue Overview</h5>
            <canvas id="revenueChart" height="100"></canvas>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
