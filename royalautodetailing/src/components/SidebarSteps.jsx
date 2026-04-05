export default function SidebarSteps({ step, steps = [] }) {
    return (
        <div className="col-lg-4 col-xl-3 booking-sidebar-column">
            <aside className="booking-sidebar">
                <ul className="list-unstyled booking-step-list mb-0">
                    {steps.map((item, i) => (
                        <li
                            key={item.title}
                            className={`booking-step-item ${step === i + 1 ? "step-active" : ""} ${step > i + 1 ? "step-complete" : ""
                                }`}
                        >
                            <span className="booking-step-number">0{i + 1}</span>
                            <div className="booking-step-copy">
                                <h6 className="mb-0">{item.title}</h6>
                            </div>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
