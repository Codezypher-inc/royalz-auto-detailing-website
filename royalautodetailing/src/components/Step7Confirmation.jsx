export default function Step7Confirmation({ setStep }) {
  const service = "First Step Paint Correction";
  const price = 650;
  const discount = 0;

  const total = price - discount;

  return (
    <>
      <h4 className="mb-4">Confirm Details</h4>

      <div className="row">

        {/* LEFT SUMMARY */}
        <div className="col-md-6">
          <div className="summary-card p-4">

            <div className="d-flex justify-content-between mb-2">
              <span>{service}</span>
              <span className="fw-bold">${price}.00</span>
            </div>

            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>Discount</span>
              <span>${discount}.00</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between total-box p-2">
              <strong>Total Price</strong>
              <strong className="text-success">${total}.00</strong>
            </div>

          </div>
        </div>

        {/* RIGHT (ICON / EMPTY SPACE) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="confirm-box text-center">
            <i className="fa fa-check-circle fa-3x text-success mb-3"></i>
            <p>Ready to confirm your booking</p>
          </div>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setStep(5)}
        >
          BACK
        </button>

        <button
          className="btn btn-danger float-end"
          onClick={() => alert("Booking Confirmed ✅")}
        >
          CONFIRM BOOKING
        </button>
      </div>
    </>
  );
}