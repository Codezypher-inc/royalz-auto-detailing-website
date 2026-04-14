import { getCategoryById, getPackageById } from "../lib/bookingCatalog";

export default function Step6Cart({ booking, setStep }) {
  const category = getCategoryById(booking.categoryId);
  const selectedPackage = getPackageById(booking.categoryId, booking.packageId);

  return (
    <>
      <h4 className="mb-4">Review Booking</h4>

      <div className="row">
        <div className="col-md-6">
          <div className="cart-card p-4">
            <h5 className="mb-3">{selectedPackage?.name || "Selected Package"}</h5>

            <p className="mb-1">
              <strong>Service:</strong> {category?.name || "Not selected"}
            </p>

            <p className="mb-1">
              <strong>Date & Time:</strong> {booking.bookingDate} / {booking.bookingTime}
            </p>

            <p className="mb-1">
              <strong>Customer:</strong> {booking.firstName} {booking.lastName}
            </p>

            <p className="mb-1">
              <strong>Email:</strong> {booking.email}
            </p>

            <p className="mb-1">
              <strong>Phone:</strong> {booking.phone}
            </p>

            {booking.vehicleDetails && (
              <p className="mb-1">
                <strong>Vehicle:</strong> {booking.vehicleDetails}
              </p>
            )}

            {booking.notes && (
              <p className="mb-1">
                <strong>Notes:</strong> {booking.notes}
              </p>
            )}

            <p className="mb-1 mt-3">
              <strong>Amount:</strong>{" "}
              <span className="text-success fw-bold">
                ${selectedPackage ? `${selectedPackage.price}.00` : "0.00"}
              </span>
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="cart-card p-4 h-100">
            <h5 className="mb-3">Before You Confirm</h5>
            <ul className="mb-0 ps-3">
              <li>We will review the request and reach out if the slot needs adjustment.</li>
              <li>Pricing may change if the vehicle condition or scope differs from the request.</li>
              <li>Your booking will be marked as pending until the team confirms it.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-secondary me-2" onClick={() => setStep(4)}>
          BACK
        </button>

        <button className="btn btn-danger float-end" onClick={() => setStep(6)}>
          NEXT STEP
        </button>
      </div>
    </>
  );
}
