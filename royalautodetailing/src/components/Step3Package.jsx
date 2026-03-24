import { useState } from "react";

export default function Step3Package({ setStep }) {
  const [selected, setSelected] = useState(null);

  const packages = [
    { name: "Brand New Car", price: 499 },
    { name: "First Step Paint Correction", price: 650 },
    { name: "Second Step Paint Correction", price: 850 },
  ];

  return (
    <>
      <h4 className="mb-4">Select Package</h4>

      {packages.map((pkg, i) => (
        <div
          key={i}
          className={`package-card p-3 mb-3 ${
            selected === pkg.name ? "active" : ""
          }`}
          onClick={() => setSelected(pkg.name)}
        >
          <div className="d-flex justify-content-between">
            <span>{pkg.name}</span>
            <strong>${pkg.price}</strong>
          </div>
        </div>
      ))}

      <button
        className="btn btn-secondary me-2"
        onClick={() => setStep(1)}
      >
        BACK
      </button>

      <button
        className="btn btn-danger float-end"
        onClick={() => setStep(3)}
        disabled={!selected}
      >
        NEXT STEP
      </button>
    </>
  );
}