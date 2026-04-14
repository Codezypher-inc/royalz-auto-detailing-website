import { useState } from "react";
import SidebarSteps from "./SidebarSteps";
import Step1Category from "./Step1Category";
import Step3Package from "./Step3Package";
import Step4DateTime from "./Step4DateTime";
import Step5Information from "./Step5Information";
import Step6Cart from "./Step6Cart";
import Step7Confirmation from "./Step7Confirmation";

function createInitialBookingState() {
  return {
    categoryId: "",
    packageId: "",
    bookingDate: "",
    bookingTime: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleDetails: "",
    notes: "",
  };
}

export default function BookingLayout() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState(createInitialBookingState());

  const steps = [
    { title: "Category", caption: "Choose your detailing lane" },
    { title: "Service", caption: "Pick the package intensity" },
    { title: "Date & Time", caption: "Reserve a studio slot" },
    { title: "Information", caption: "Driver and vehicle details" },
    { title: "Cart", caption: "Review your selections" },
    { title: "Confirmation", caption: "Lock in your booking" },
  ];

  const activeStep = steps[step - 1];
  const progress = Math.round((step / steps.length) * 100);

  const handleBookingChange = (partialUpdate) => {
    setBooking((currentBooking) => ({
      ...currentBooking,
      ...partialUpdate,
    }));
  };

  const resetBooking = () => {
    setBooking(createInitialBookingState());
  };

  return (
    <section className="booking-experience">
      <div className="booking-orb booking-orb-one"></div>
      <div className="booking-orb booking-orb-two"></div>

      <div className="container py-5">
        <div className="booking-hero mb-4">
          <div>
            <h4 className="booking-title">Welcome to Royalz Premium Booking</h4>
            <p className="booking-subtitle mb-0">
              Move through the booking steps, review the exact package you want,
              and send a real reservation request to the Royalz team.
            </p>
          </div>

          <div className="booking-hero-card">
            <div className="booking-hero-label">Live Progress</div>
            <div className="booking-hero-step">
              Step {step} of {steps.length}
            </div>
            <div className="booking-progress-track">
              <span style={{ width: `${progress}%` }}></span>
            </div>
            <div className="booking-hero-caption">{activeStep.caption}</div>
          </div>
        </div>

        <div className="booking-shell">
          <div className="row g-0">
            <SidebarSteps step={step} steps={steps} />

            <div className="col-lg-8 col-xl-9 booking-stage-column">
              <div className="booking-stage">
                <div className="booking-stage-header">
                  <div>
                    <p className="booking-stage-kicker">Current Stage</p>
                  </div>
                  <div className="booking-stage-chip">{progress}% synced</div>
                </div>

                {step === 1 && (
                  <Step1Category
                    booking={booking}
                    onBookingChange={handleBookingChange}
                    setStep={setStep}
                  />
                )}
                {step === 2 && (
                  <Step3Package
                    booking={booking}
                    onBookingChange={handleBookingChange}
                    setStep={setStep}
                  />
                )}
                {step === 3 && (
                  <Step4DateTime
                    booking={booking}
                    onBookingChange={handleBookingChange}
                    setStep={setStep}
                  />
                )}
                {step === 4 && (
                  <Step5Information
                    booking={booking}
                    onBookingChange={handleBookingChange}
                    setStep={setStep}
                  />
                )}
                {step === 5 && <Step6Cart booking={booking} setStep={setStep} />}
                {step === 6 && (
                  <Step7Confirmation
                    booking={booking}
                    resetBooking={resetBooking}
                    setStep={setStep}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
