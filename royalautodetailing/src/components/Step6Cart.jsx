export default function Step6Cart({ setStep }) {
  return (
    <>
      <h4 className="mb-4">Add to Cart</h4>

      <div className="row">

        {/* CART ITEM */}
        <div className="col-md-6">
          <div className="cart-card p-4">

            <h5 className="mb-3">First Step Paint Correction</h5>

            <p className="mb-1">
              <strong>Service:</strong> Ceramic Coating
            </p>

            <p className="mb-1">
              <strong>Date & Time:</strong> 2026-03-25 / 09:00
            </p>

            <p className="mb-1">
              <strong>Amount:</strong>{" "}
              <span className="text-success fw-bold">$650.00</span>
            </p>

          </div>
        </div>

      </div>

      {/* ADD MORE */}
      <div className="mt-4">
        <button className="btn btn-outline-dark">
          + Add New Booking
        </button>
      </div>

      {/* BUTTONS */}
      <div className="mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setStep(4)}
        >
          BACK
        </button>

        <button
          className="btn btn-danger float-end"
          onClick={() => setStep(6)}
        >
          NEXT STEP
        </button>
      </div>
    </>
  );
}