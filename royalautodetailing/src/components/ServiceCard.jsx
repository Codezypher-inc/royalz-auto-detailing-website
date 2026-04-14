export default function ServiceCard({ title, subtitle, selected, onClick }) {
  return (
    <div className="col-md-6 mb-4">
      <div
        className={`service-card p-4 text-center ${
          selected ? "active" : ""
        }`}
        onClick={onClick}
      >
        <h5>{title}</h5>
        <small>{subtitle || "Auto Detailing"}</small>
      </div>
    </div>
  );
}
