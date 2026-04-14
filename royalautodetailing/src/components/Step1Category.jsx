import ServiceCard from "./ServiceCard";
import { bookingCatalog } from "../lib/bookingCatalog";

export default function Step1Category({ booking, onBookingChange, setStep }) {
  const selectedCategory = booking.categoryId;

  return (
    <>
      <h4 className="mb-4" style={{ color: "#0f172a" }}>
        Select Service Category
      </h4>
      <p className="text-muted mb-4">
        Start by choosing the type of service you want to book. We will tailor the
        next step packages to this selection.
      </p>

      <div className="row">
        {bookingCatalog.map((category) => (
          <ServiceCard
            key={category.id}
            title={category.name}
            subtitle={category.shortLabel}
            selected={selectedCategory === category.id}
            onClick={() =>
              onBookingChange({
                categoryId: category.id,
                packageId: "",
              })
            }
          />
        ))}
      </div>

      <button
        className="btn btn-danger float-end"
        onClick={() => setStep(2)}
        disabled={!selectedCategory}
      >
        NEXT STEP
      </button>
    </>
  );
}
