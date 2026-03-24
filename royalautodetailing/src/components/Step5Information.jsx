import { useState } from "react";

export default function Step5Information({ setStep }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.phone;

  return (
    <>
      <h4 className="mb-4">Fill Information</h4>

      <div className="row">

        {/* First Name */}
        <div className="col-md-6 mb-3">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="col-md-6 mb-3">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="col-md-6 mb-3">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="col-md-6 mb-3">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* BUTTONS */}
      <div className="mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setStep(3)}
        >
          BACK
        </button>

        <button
          className="btn btn-danger float-end"
          onClick={() => setStep(5)}
          disabled={!isValid}
        >
          NEXT STEP
        </button>
      </div>
    </>
  );
}