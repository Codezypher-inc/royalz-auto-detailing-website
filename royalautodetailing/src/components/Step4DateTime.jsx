import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiGet } from "../lib/api";
import { bookingTimeSlots } from "../lib/bookingTimeSlots";

function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Step4DateTime({ booking, onBookingChange, setStep }) {
  const initialDate = booking.bookingDate
    ? new Date(`${booking.bookingDate}T12:00:00`)
    : new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [availableSlots, setAvailableSlots] = useState(bookingTimeSlots);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState("");

  const formattedDate = useMemo(
    () => booking.bookingDate || toDateValue(selectedDate),
    [booking.bookingDate, selectedDate]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadAvailability() {
      if (!formattedDate) {
        return;
      }

      setLoadingSlots(true);
      setSlotError("");

      try {
        const response = await apiGet(
          `/api/booking-availability?date=${encodeURIComponent(formattedDate)}`
        );

        if (!isMounted) {
          return;
        }

        const nextAvailableSlots = response.availableSlots || [];
        setAvailableSlots(nextAvailableSlots);

        if (booking.bookingTime && !nextAvailableSlots.includes(booking.bookingTime)) {
          onBookingChange({ bookingTime: "" });
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setSlotError(error.message);
        setAvailableSlots([]);
      } finally {
        if (isMounted) {
          setLoadingSlots(false);
        }
      }
    }

    loadAvailability();

    return () => {
      isMounted = false;
    };
  }, [booking.bookingTime, formattedDate, onBookingChange]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onBookingChange({ bookingDate: toDateValue(date), bookingTime: "" });
  };

  return (
    <>
      <h4 className="mb-4">Select Date & Time</h4>

      <div className="row">
        <div className="col-md-6">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            minDate={new Date()}
          />
        </div>

        <div className="col-md-6">
          <h6 className="mb-3">{selectedDate.toDateString()}</h6>
          <p className="text-muted">
            Choose a preferred studio time. Only currently available slots are shown.
          </p>

          {loadingSlots && <div className="alert alert-info py-2">Checking availability...</div>}
          {slotError && <div className="alert alert-danger py-2">{slotError}</div>}

          {!loadingSlots && !slotError && availableSlots.length === 0 && (
            <div className="alert alert-warning py-2">
              No time slots are available for this date. Please choose another date.
            </div>
          )}

          <div className="d-flex flex-wrap gap-2">
            {availableSlots.map((time) => (
              <button
                key={time}
                type="button"
                className={`time-slot ${
                  booking.bookingTime === time ? "active" : ""
                }`}
                onClick={() =>
                  onBookingChange({ bookingDate: formattedDate, bookingTime: time })
                }
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-secondary me-2" onClick={() => setStep(2)}>
          BACK
        </button>

        <button
          className="btn btn-danger float-end"
          onClick={() => setStep(4)}
          disabled={!booking.bookingDate || !booking.bookingTime}
        >
          NEXT STEP
        </button>
      </div>
    </>
  );
}
