import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const timeSlots = ["09:00", "11:00", "13:00", "15:00"];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onBookingChange({ bookingDate: toDateValue(date) });
  };

  const formattedDate = booking.bookingDate || toDateValue(selectedDate);

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
            Choose a preferred studio time. We can follow up if the final slot
            needs a small adjustment.
          </p>

          <div className="d-flex flex-wrap gap-2">
            {timeSlots.map((time) => (
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
