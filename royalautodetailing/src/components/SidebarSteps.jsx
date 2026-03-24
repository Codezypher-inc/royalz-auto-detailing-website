export default function SidebarSteps({ step }) {
    const steps = [
        "Category",
        "Service",
        "Date & Time",
        "Information",
        "Cart",
        "Confirmation",
    ];

    return (
        <div className="col-md-3 bg-dark text-white p-4">
            <h5 className="mb-4">ROYALZ</h5>

            <ul className="list-unstyled">
                {steps.map((s, i) => (
                    <li
                        key={i}
                        className={`mb-3 ${step === i + 1 ? "step-active" : ""
                            }`}
                    >
                        {i + 1}. {s}
                    </li>
                ))}
            </ul>
        </div>
    );
}