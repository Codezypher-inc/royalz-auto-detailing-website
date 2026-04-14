import { getCategoryById } from "../lib/bookingCatalog";

export default function Step3Package({ booking, onBookingChange, setStep }) {
  const selectedCategory = getCategoryById(booking.categoryId);
  const selectedPackageId = booking.packageId;
  const packages = selectedCategory?.packages || [];

  return (
    <>
      <h4 className="mb-4">Select Package</h4>
      <p className="text-muted mb-4">
        {selectedCategory
          ? `Available packages for ${selectedCategory.name}.`
          : "Choose a service category first to view the available packages."}
      </p>

      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={`package-card p-3 mb-3 ${
            selectedPackageId === pkg.id ? "active" : ""
          }`}
          onClick={() => onBookingChange({ packageId: pkg.id })}
        >
          <div className="d-flex justify-content-between align-items-start gap-3">
            <div>
              <span>{pkg.name}</span>
              <div className="small text-muted mt-1">{pkg.description}</div>
            </div>
            <strong>${pkg.price}</strong>
          </div>
        </div>
      ))}

      <button className="btn btn-secondary me-2" onClick={() => setStep(1)}>
        BACK
      </button>

      <button
        className="btn btn-danger float-end"
        onClick={() => setStep(3)}
        disabled={!selectedPackageId}
      >
        NEXT STEP
      </button>
    </>
  );
}
