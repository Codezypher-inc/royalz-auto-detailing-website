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

    return (
        <div className="container py-5">
            <div className="row shadow rounded overflow-hidden">

                {/* LEFT SIDEBAR */}
                <SidebarSteps step={step} />

                {/* RIGHT CONTENT */}
                <div className="col-md-9 p-4">
                    {step === 1 && <Step1Category setStep={setStep} />}
                    {step === 2 && <Step3Package setStep={setStep} />}
                    {step === 3 && <Step4DateTime setStep={setStep} />}
                    {step === 4 && <Step5Information setStep={setStep} />}
                    {step === 5 && <Step6Cart setStep={setStep} />}
                    {step === 6 && <Step7Confirmation setStep={setStep} />}
                </div>

            </div>
        </div>
    );
}