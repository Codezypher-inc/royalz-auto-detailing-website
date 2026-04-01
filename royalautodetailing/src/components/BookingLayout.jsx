import { useState } from "react";
import SidebarSteps from "./SidebarSteps";
import Step1Category from "./Step1Category";
import Step3Package from "./Step3Package";
import Step4DateTime from "./Step4DateTime";
import Step5Information from "./Step5Information";
import Step6Cart from "./Step6Cart";
import Step7Confirmation from "./Step7Confirmation";

export default function BookingLayout() {
    const [step, setStep] = useState(1); // start from service for now
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

    return (
        <section className="booking-experience">
            <div className="booking-orb booking-orb-one"></div>
            <div className="booking-orb booking-orb-two"></div>

            <div className="container py-5">
                <div className="booking-hero mb-4">
                    <div>
                        {/* <span className="booking-eyebrow">Royalz Premium Booking</span> */}
                        <h4 className="booking-title">Welcome to Royalz Premium Booking</h4>
                        <p className="booking-subtitle mb-0">
                            Smooth step flow, cleaner visuals, and a premium booking atmosphere for customers ready to reserve.
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

                        <div className="col-lg-8 col-xl-9">
                            <div className="booking-stage">
                                <div className="booking-stage-header">
                                    <div>
                                        <p className="booking-stage-kicker">Current Stage</p>
                                        <h2 className="booking-stage-title">{activeStep.title}</h2>
                                    </div>
                                    <div className="booking-stage-chip">{progress}% synced</div>
                                </div>

                                {step === 1 && <Step1Category setStep={setStep} />}
                                {step === 2 && <Step3Package setStep={setStep} />}
                                {step === 3 && <Step4DateTime setStep={setStep} />}
                                {step === 4 && <Step5Information setStep={setStep} />}
                                {step === 5 && <Step6Cart setStep={setStep} />}
                                {step === 6 && <Step7Confirmation setStep={setStep} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
