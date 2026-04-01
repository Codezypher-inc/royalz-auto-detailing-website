import Swal from "sweetalert2";

export default function Step7Confirmation({ setStep }) {
  const service = "First Step Paint Correction";
  const price = 650;
  const discount = 0;

  const total = price - discount;

  const handleConfirmBooking = async () => {
    await Swal.fire({
      title: "Booking Confirmed",
      html: `
        <div class="booking-swal-copy">
          <p>Your Royalz detailing session has been locked in successfully.</p>
          <p>Thank you for choosing Royalz Auto Detailing.</p>
        </div>
      `,
      icon: "success",
      confirmButtonText: "View Booking",
      showCancelButton: true,
      cancelButtonText: "Close",
      confirmButtonColor: "#d81324",
      cancelButtonColor: "#0b2154",
      background: "#ffffff",
      color: "#111111",
      customClass: {
        popup: "booking-swal-popup",
        title: "booking-swal-title",
        confirmButton: "booking-swal-button",
        cancelButton: "booking-swal-button booking-swal-button-secondary",
      },
      showClass: {
        popup: "swal2-show booking-swal-show",
      },
    });
  };

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
          onClick={handleConfirmBooking}
        >
          CONFIRM BOOKING
        </button>
      </div>
    </>
  );
}
