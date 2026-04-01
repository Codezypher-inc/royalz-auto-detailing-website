export default function SidebarSteps({ step, steps = [] }) {
    return (
        <div className="col-lg-4 col-xl-3">
            <aside className="booking-sidebar">
                <div className="booking-sidebar-brand">
                    <span className="booking-sidebar-badge">Live Flow</span>
                    <h5 className="mb-1">ROYALZ</h5>
                    <p className="mb-0">Premium detailing command center</p>
                </div>

                <ul className="list-unstyled booking-step-list mb-0">
                    {steps.map((item, i) => (
                        <li
                            key={item.title}
                            className={`booking-step-item ${step === i + 1 ? "step-active" : ""} ${step > i + 1 ? "step-complete" : ""
                                }`}
                        >
                            <span className="booking-step-number">0{i + 1}</span>
                            <div>
                                <h6 className="mb-1">{item.title}</h6>
                                <p className="mb-0">{item.caption}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
