import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../lib/api";
import { useAdminAuth } from "../context/AdminAuthContext";
import { bookingTimeSlots } from "../lib/bookingTimeSlots";

function getTodayDateValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatSelectedDate(dateValue) {
  if (!dateValue) {
    return "Selected date";
  }

  const parsed = new Date(`${dateValue}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

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

function nextStatusActions(status) {
  switch (status) {
    case "pending":
      return [
        { value: "confirmed", label: "Confirm", className: "btn-outline-primary" },
        { value: "cancelled", label: "Cancel", className: "btn-outline-danger" },
      ];
    case "confirmed":
      return [
        { value: "completed", label: "Complete", className: "btn-outline-success" },
        { value: "cancelled", label: "Cancel", className: "btn-outline-danger" },
      ];
    case "completed":
      return [{ value: "cancelled", label: "Cancel", className: "btn-outline-danger" }];
    case "cancelled":
      return [{ value: "pending", label: "Reopen", className: "btn-outline-secondary" }];
    default:
      return [];
  }
}

function formatLeadSource(source) {
  if (source === "homepage") {
    return "Homepage";
  }

  if (source === "contact") {
    return "Contact Page";
  }

  return "Unknown";
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [email, setEmail] = useState("admin@example.com");
  const [editMode, setEditMode] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);
  const [customers, setCustomers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [inquiryStats, setInquiryStats] = useState({
    total: 0,
    new: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState(getTodayDateValue());
  const [availabilitySlots, setAvailabilitySlots] = useState(
    bookingTimeSlots.map((time) => ({
      time,
      available: true,
      blockedByAdmin: false,
      booked: false,
    }))
  );
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [savingSlot, setSavingSlot] = useState("");
  const [savingBookingId, setSavingBookingId] = useState("");
  const { adminUser, isAdmin, isLoading, session, signOutAdmin } = useAdminAuth();

  const applyDashboardPayload = (response) => {
    setCustomers(response.customers || []);
    setInquiries(response.inquiries || []);
    setStats(
      response.stats || {
        total: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
      }
    );
    setInquiryStats(
      response.inquiryStats || {
        total: 0,
        new: 0,
      }
    );
    setEmail(response.emailRecipient || "admin@example.com");
    setTempEmail(response.emailRecipient || "admin@example.com");
  };

  const loadDashboard = async () => {
    const response = await apiGet("/api/admin/dashboard", session.access_token);
    applyDashboardPayload(response);
  };

  const loadAvailability = async (dateValue) => {
    const response = await apiGet(
      `/api/admin/availability?date=${encodeURIComponent(dateValue)}`,
      session.access_token
    );

    setAvailabilitySlots(
      response.slots ||
        bookingTimeSlots.map((time) => ({
          time,
          available: true,
          blockedByAdmin: false,
          booked: false,
        }))
    );
  };

  useEffect(() => {
    let isMounted = true;

    async function bootstrapDashboard() {
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

        applyDashboardPayload(response);
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

    bootstrapDashboard();

    return () => {
      isMounted = false;
    };
  }, [isAdmin, isLoading, navigate, session?.access_token]);

  useEffect(() => {
    let isMounted = true;

    async function refreshAvailability() {
      if (isLoading || !isAdmin || !session?.access_token || !availabilityDate) {
        return;
      }

      setAvailabilityLoading(true);
      setAvailabilityError("");

      try {
        const response = await apiGet(
          `/api/admin/availability?date=${encodeURIComponent(availabilityDate)}`,
          session.access_token
        );

        if (!isMounted) {
          return;
        }

        setAvailabilitySlots(
          response.slots ||
            bookingTimeSlots.map((time) => ({
              time,
              available: true,
              blockedByAdmin: false,
              booked: false,
            }))
        );
      } catch (apiError) {
        if (!isMounted) {
          return;
        }

        setAvailabilityError(apiError.message);
      } finally {
        if (isMounted) {
          setAvailabilityLoading(false);
        }
      }
    }

    refreshAvailability();

    return () => {
      isMounted = false;
    };
  }, [availabilityDate, isAdmin, isLoading, session?.access_token]);

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

  const handleAvailabilityToggle = async (slot) => {
    if (!session?.access_token) {
      return;
    }

    setAvailabilityError("");
    setSavingSlot(slot.time);

    try {
      const response = await apiPut(
        "/api/admin/availability",
        {
          bookingDate: availabilityDate,
          bookingTime: slot.time,
          isAvailable: !slot.available,
        },
        session.access_token
      );

      setAvailabilitySlots(response.slots || []);
    } catch (apiError) {
      setAvailabilityError(apiError.message);
    } finally {
      setSavingSlot("");
    }
  };

  const handleBookingStatusChange = async (bookingId, nextStatus) => {
    if (!session?.access_token) {
      return;
    }

    setError("");
    setSavingBookingId(bookingId);

    try {
      await apiPut(
        `/api/admin/bookings/${bookingId}/status`,
        { status: nextStatus },
        session.access_token
      );

      await loadDashboard();

      if (customers.some((customer) => customer.id === bookingId && customer.date === availabilityDate)) {
        setAvailabilityError("");
        await loadAvailability(availabilityDate);
      }
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setSavingBookingId("");
    }
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fas fa-home" },
    { key: "recent", label: "Recent Bookings", icon: "fas fa-calendar-check" },
    { key: "leads", label: "Lead Inquiries", icon: "fas fa-inbox" },
    { key: "availability", label: "Availability", icon: "fas fa-clock" },
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
                <div className="col-md-3 col-6">
                  <div className="bg-white p-4 rounded shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary">New Leads</span>
                      <span className="bg-info text-white rounded p-2">
                        <i className="fas fa-inbox"></i>
                      </span>
                    </div>
                    <h3>{inquiryStats.new || 0}</h3>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-xl-7">
                  <div className="bg-white p-4 rounded shadow-sm h-100">
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
                </div>
                <div className="col-xl-5">
                  <div className="bg-white p-4 rounded shadow-sm h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Latest Leads</h5>
                      <span className="badge bg-info-subtle text-info">
                        {inquiryStats.total || 0} total
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-3">
                      {inquiries.slice(0, 4).map((inquiry) => (
                        <div key={inquiry.id} className="border rounded p-3 bg-light">
                          <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                              <div className="fw-semibold">{inquiry.name}</div>
                              <div className="small text-muted">{inquiry.email}</div>
                            </div>
                            <span className="badge bg-secondary-subtle text-secondary">
                              {formatLeadSource(inquiry.source)}
                            </span>
                          </div>
                          <div className="small text-muted mt-2">
                            {inquiry.serviceInterest} | {inquiry.preferredDate}
                          </div>
                          <p className="mb-0 mt-2 small">{inquiry.message}</p>
                        </div>
                      ))}
                      {inquiries.length === 0 && (
                        <div className="text-muted py-4 text-center">
                          No inquiries have been submitted yet.
                        </div>
                      )}
                    </div>
                  </div>
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
                      <th>Actions</th>
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
                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            {nextStatusActions(customer.status).map((action) => (
                              <button
                                key={action.value}
                                type="button"
                                className={`btn btn-sm ${action.className}`}
                                onClick={() =>
                                  handleBookingStatusChange(customer.id, action.value)
                                }
                                disabled={savingBookingId === customer.id}
                              >
                                {savingBookingId === customer.id ? "Saving..." : action.label}
                              </button>
                            ))}
                            {nextStatusActions(customer.status).length === 0 && (
                              <span className="small text-muted">No actions</span>
                            )}
                          </div>
                        </td>
                        <td>{customer.details}</td>
                      </tr>
                    ))}
                    {customers.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center text-muted py-4">
                          No bookings have been submitted yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeMenu === "leads" && (
            <div className="bg-white p-3 rounded shadow-sm mb-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
                <div>
                  <h5 className="mb-1">Lead Inquiries</h5>
                  <p className="text-muted mb-0">
                    Review contact page and homepage inquiries captured in Supabase.
                  </p>
                </div>
                <span className="badge bg-info-subtle text-info px-3 py-2">
                  {inquiryStats.total || 0} total leads
                </span>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Source</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Preferred Date</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td>{formatLeadSource(inquiry.source)}</td>
                        <td>{inquiry.name}</td>
                        <td>{inquiry.email}</td>
                        <td>{inquiry.phone}</td>
                        <td>{inquiry.serviceInterest}</td>
                        <td>{inquiry.preferredDate}</td>
                        <td>{inquiry.message}</td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-4">
                          No inquiries have been submitted yet.
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
          {activeMenu === "availability" && (
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
                <div>
                  <h5 className="mb-1">Booking Availability</h5>
                  <p className="text-muted mb-0">
                    Block or reopen studio time slots. Booked slots stay reserved and stop
                    showing in the public booking flow automatically.
                  </p>
                </div>
                <div>
                  <label htmlFor="availability-date" className="form-label small text-muted mb-1">
                    Select date
                  </label>
                  <input
                    id="availability-date"
                    type="date"
                    className="form-control"
                    value={availabilityDate}
                    min={getTodayDateValue()}
                    onChange={(e) => setAvailabilityDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="alert alert-light border mb-4">
                <strong>{formatSelectedDate(availabilityDate)}</strong>
                <div className="small text-muted mt-1">
                  Available slots stay bookable. Blocked slots are hidden on the website.
                  Already-booked slots remain reserved until the booking status changes.
                </div>
              </div>

              {availabilityError && <div className="alert alert-danger">{availabilityError}</div>}
              {availabilityLoading && (
                <div className="alert alert-info">Loading availability for this date...</div>
              )}

              {!availabilityLoading && (
                <div className="row g-3">
                  {availabilitySlots.map((slot) => {
                    let stateLabel = "Available";
                    let stateClass = "bg-success-subtle text-success";

                    if (slot.booked) {
                      stateLabel = "Booked";
                      stateClass = "bg-secondary-subtle text-secondary";
                    } else if (slot.blockedByAdmin) {
                      stateLabel = "Blocked";
                      stateClass = "bg-danger-subtle text-danger";
                    }

                    const buttonLabel = slot.available ? "Block Slot" : "Make Available";

                    return (
                      <div className="col-sm-6 col-xl-3" key={slot.time}>
                        <div className="border rounded p-3 h-100 bg-light">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <div className="fw-semibold">{slot.time}</div>
                              <div className="small text-muted">
                                {slot.booked
                                  ? "Reserved by an active booking"
                                  : slot.blockedByAdmin
                                    ? "Hidden from customer booking"
                                    : "Visible in customer booking"}
                              </div>
                            </div>
                            <span className={`badge ${stateClass}`}>{stateLabel}</span>
                          </div>
                          <button
                            type="button"
                            className={`btn btn-sm w-100 ${
                              slot.available ? "btn-outline-danger" : "btn-outline-success"
                            }`}
                            onClick={() => handleAvailabilityToggle(slot)}
                            disabled={slot.booked || savingSlot === slot.time}
                          >
                            {savingSlot === slot.time ? "Saving..." : buttonLabel}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
