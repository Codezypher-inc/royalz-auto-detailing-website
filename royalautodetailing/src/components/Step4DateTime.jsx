import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Step4DateTime({ setStep }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = ["09:00", "11:00", "13:00", "15:00"];

  return (
    <>
      <h4 className="mb-4">Select Date & Time</h4>

      <div className="row">
        
        {/* 📅 LEFT - CALENDAR */}
        <div className="col-md-6">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            minDate={new Date()}
          />
        </div>

        {/* ⏰ RIGHT - TIME */}
        <div className="col-md-6">
          <h6 className="mb-3">
            {selectedDate.toDateString()}
          </h6>

          <div className="d-flex flex-wrap gap-2">
            {timeSlots.map((time, i) => (
              <button
                key={i}
                className={`time-slot ${
                  selectedTime === time ? "active" : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-4">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setStep(2)}
        >
          BACK
        </button>

        <button
          className="btn btn-danger float-end"
          onClick={() => setStep(4)}
          disabled={!selectedTime}
        >
          NEXT STEP
        </button>
      </div>
    </>
  );
}