import { Link } from "react-router-dom";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import "./about.css";

const values = [
  {
    number: "01",
    title: "Premium Workmanship",
    copy: "Every vehicle gets careful prep, quality products, and finishing touches that make the result feel complete.",
  },
  {
    number: "02",
    title: "Honest Service",
    copy: "We keep the process simple, explain what your vehicle needs, and stay clear on packages and expectations.",
  },
  {
    number: "03",
    title: "Consistent Results",
    copy: "From single vehicles to repeat clients, our goal is the same every time: clean execution and dependable quality.",
  },
];

const highlights = [
  "Interior and exterior detailing",
  "Tint, wraps, and premium finish work",
  "Paint enhancement and protection services",
  "Care tailored for cars, trucks, fleets, boats, and motorcycles",
];

export default function About() {
  return (
    <>
      <SiteHeader activePage="about" />

      <section
        className="about-hero"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(11, 33, 84, 0.92), rgba(11, 33, 84, 0.78)), radial-gradient(circle at top right, rgba(216, 19, 36, 0.3), transparent 34%), url(${process.env.PUBLIC_URL}/img/carousel-bg-1.jpg)`,
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="about-kicker">About Royalz</span>
              <h1 className="about-title">Built for drivers who want their vehicle to look exceptional.</h1>
              <p className="about-subtitle">
                Royalz Auto Detailing delivers premium detailing and protection services in Halifax with a focus on presentation, precision, and customer trust.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/booking" className="btn btn-primary py-3 px-5">
                  Book Now
                </Link>
                <Link to="/contact" className="btn btn-outline-light py-3 px-5">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="about-hero-card">
                <div className="about-stat-grid">
                  <div>
                    <strong>15+</strong>
                    <span>Years of hands-on care</span>
                  </div>
                  <div>
                    <strong>5</strong>
                    <span>Vehicle categories served</span>
                  </div>
                  <div>
                    <strong>Premium</strong>
                    <span>Products and finish standards</span>
                  </div>
                  <div>
                    <strong>Halifax</strong>
                    <span>Locally focused service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="about-image-wrap">
                <img src="/img/about.jpg" alt="Royalz Auto Detailing team at work" className="img-fluid rounded-4 w-100 about-main-image" />
                <div className="about-image-badge">
                  <span>Trusted detailing</span>
                  <strong>Sharper shine. Cleaner finish.</strong>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="about-section-label">Who We Are</span>
              <h2 className="mb-4">A detailing shop focused on quality, not shortcuts.</h2>
              <p>
                We built Royalz around the idea that vehicle care should feel premium from start to finish. That means better presentation, cleaner execution, and attention to the details most people skip.
              </p>
              <p>
                Whether you need a refreshed daily driver, protection for a newer vehicle, or a cleaner look for your fleet, we approach every job with the same standard: leave it better than expected.
              </p>

              <div className="about-highlight-list mt-4">
                {highlights.map((item) => (
                  <div key={item} className="about-highlight-item">
                    <i className="fa fa-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values py-5">
        <div className="container">
          <div className="text-center mx-auto about-section-heading">
            <span className="about-section-label">Why Clients Choose Us</span>
            <h2 className="mt-3">The Royalz standard stays the same on every job.</h2>
            <p className="mb-0">
              We care about the result customers see, but also the process that gets them there.
            </p>
          </div>

          <div className="row g-4 mt-1">
            {values.map((value) => (
              <div className="col-md-6 col-lg-4" key={value.title}>
                <article className="about-value-card h-100">
                  <span className="about-value-number">{value.number}</span>
                  <h4>{value.title}</h4>
                  <p className="mb-0">{value.copy}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta py-5">
        <div className="container">
          <div className="about-cta-panel">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <span className="about-section-label text-white border-white-25">Ready To Visit</span>
                <h2 className="text-white mt-3">Let’s get your vehicle booked in for a premium Royalz finish.</h2>
                <p className="text-white-50 mb-0">
                  Start your booking online or reach out if you want help choosing the right service.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <div className="d-flex flex-wrap gap-3 justify-content-lg-end">
                  <Link to="/booking" className="btn btn-primary py-3 px-5">
                    Start Booking
                  </Link>
                  <Link to="/contact" className="btn btn-light py-3 px-5">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
