import { useState } from "react";
import ServiceCard from "./ServiceCard";

export default function Step2Service({ setStep }) {
  const [selected, setSelected] = useState(null);

  const services = [
    "Ceramic Coating",
    "Tint",
    "Wraps",
    "Paint Protection Film (PPF)",
  ];

  return (
    <>
      <h4 className="mb-4" style={{ color: "#0f172a" }}>
        Select Service
      </h4>

      <div className="row">
        {services.map((s, i) => (
          <ServiceCard
            key={i}
            title={s}
            selected={selected === s}
            onClick={() => setSelected(s)}
          />
        ))}
      </div>

      <button
        className="btn btn-danger float-end"
        onClick={() => setStep(2)}
        disabled={!selected}
      >
        NEXT STEP
      </button>
    </>
  );
}