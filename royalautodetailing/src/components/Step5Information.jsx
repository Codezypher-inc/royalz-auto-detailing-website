export default function Step5Information({ booking, onBookingChange, setStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onBookingChange({ [name]: value });
  };

  const isValid =
    booking.firstName &&
    booking.lastName &&
    booking.email &&
    booking.phone;

  return (
    <>
      <h4 className="mb-4">Fill Information</h4>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={booking.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={booking.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={booking.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={booking.phone}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Vehicle Details</label>
          <input
            type="text"
            name="vehicleDetails"
            className="form-control"
            placeholder="Example: 2022 BMW X5, black"
            value={booking.vehicleDetails}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Additional Notes</label>
          <input
            type="text"
            name="notes"
            className="form-control"
            placeholder="Anything we should know before the appointment?"
            value={booking.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-secondary me-2" onClick={() => setStep(3)}>
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
