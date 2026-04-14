import { useState } from "react";
import Swal from "sweetalert2";
import { apiPost } from "../lib/api";
import { getCategoryById, getPackageById } from "../lib/bookingCatalog";

export default function Step7Confirmation({ booking, resetBooking, setStep }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serviceCategory = getCategoryById(booking.categoryId);
  const selectedPackage = getPackageById(booking.categoryId, booking.packageId);
  const price = selectedPackage?.price || 0;
  const discount = 0;
  const total = price - discount;

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);

    try {
      const response = await apiPost("/api/bookings", {
        categoryId: booking.categoryId,
        categoryName: serviceCategory?.name || "",
        packageId: booking.packageId,
        packageName: selectedPackage?.name || "",
        packagePrice: price,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        phone: booking.phone,
        vehicleDetails: booking.vehicleDetails,
        notes: booking.notes,
      });

      await Swal.fire({
        title: "Booking Request Sent",
        html: `
          <div class="booking-swal-copy">
            <p>Your Royalz booking request has been submitted successfully.</p>
            <p>Reference: <strong>${response.booking.reference}</strong></p>
          </div>
        `,
        icon: "success",
        confirmButtonText: "Done",
        confirmButtonColor: "#d81324",
        background: "#ffffff",
        color: "#111111",
        customClass: {
          popup: "booking-swal-popup",
          title: "booking-swal-title",
          confirmButton: "booking-swal-button",
        },
        showClass: {
          popup: "swal2-show booking-swal-show",
        },
      });

      resetBooking();
      setStep(1);
    } catch (error) {
      await Swal.fire({
        title: "Unable To Submit Booking",
        text: error.message || "Please try again in a moment.",
        icon: "error",
        confirmButtonColor: "#d81324",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h4 className="mb-4">Confirm Details</h4>

      <div className="row">
        <div className="col-md-6">
          <div className="summary-card p-4">
            <div className="d-flex justify-content-between mb-2">
              <span>{selectedPackage?.name || "Selected Package"}</span>
              <span className="fw-bold">${price}.00</span>
            </div>

            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>{serviceCategory?.name || "Selected Service"}</span>
              <span>{booking.bookingDate} / {booking.bookingTime}</span>
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

        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="confirm-box text-center">
            <i className="fa fa-check-circle fa-3x text-success mb-3"></i>
            <p>Ready to submit your booking request</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-secondary me-2" onClick={() => setStep(5)}>
          BACK
        </button>

        <button
          className="btn btn-danger float-end"
          onClick={handleConfirmBooking}
          disabled={isSubmitting}
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT BOOKING"}
        </button>
      </div>
    </>
  );
}
