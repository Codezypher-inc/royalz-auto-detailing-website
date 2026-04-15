import { useState } from "react";
import Seo from "../components/Seo";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { apiPost } from "../lib/api";
import { buildLocalBusinessSchema, buildWebPageSchema } from "../lib/seo";
import "./contact.css";

const contactCards = [
  {
    icon: "fa-map-marker-alt",
    title: "Visit Us",
    detail: "90 Horseshoe Lake Drive, Halifax, NS B3S 0B4",
  },
  {
    icon: "fa-phone-alt",
    title: "Call Us",
    detail: "+1 (782) 882-0667 / +1 (902) 412-2913",
  },
  {
    icon: "fa-clock",
    title: "Opening Hours",
    detail: "Mon - Fri: 9:00 AM - 9:00 PM | Sat - Sun: 9:00 AM - 12:00 PM",
  },
];

function createInitialFormState() {
  return {
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  };
}

export default function Contact() {
  const title = "Contact Royalz Auto Detailing";
  const description =
    "Contact Royalz Auto Detailing in Halifax for bookings, service questions, pricing guidance, and premium vehicle care support.";
  const [form, setForm] = useState(createInitialFormState());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      await apiPost("/api/inquiries", {
        source: "contact",
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      });

      setForm(createInitialFormState());
      setFeedback({
        type: "success",
        message: "Your inquiry has been sent. The Royalz team can now review it in the dashboard.",
      });
    } catch (error) {
      setFeedback({
        type: "danger",
        message: error.message || "Unable to send your inquiry right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/contact"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            buildLocalBusinessSchema(),
            buildWebPageSchema({
              title,
              description,
              path: "/contact",
            }),
          ],
        }}
      />
      <SiteHeader activePage="contact" />

      <section
        className="contact-hero"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(11, 33, 84, 0.92), rgba(11, 33, 84, 0.78)), radial-gradient(circle at top right, rgba(216, 19, 36, 0.3), transparent 34%), url(${process.env.PUBLIC_URL}/img/carousel-bg-2.jpg)`,
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="contact-kicker">Contact Royalz</span>
              <h1 className="contact-title">
                Let's talk about your vehicle and the right service for it.
              </h1>
              <p className="contact-subtitle">
                Reach out for bookings, pricing questions, service guidance, or anything else you
                want to clarify before visiting Royalz Auto Detailing.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="contact-hero-panel">
                <div className="contact-hero-stat">
                  <strong>Fast Replies</strong>
                  <span>Simple communication and clear next steps.</span>
                </div>
                <div className="contact-hero-stat">
                  <strong>Booking Support</strong>
                  <span>We can help you choose the right package before you reserve.</span>
                </div>
                <div className="contact-hero-stat">
                  <strong>Local Service</strong>
                  <span>Proudly serving Halifax with premium detailing care.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-info py-5">
        <div className="container">
          <div className="row g-4">
            {contactCards.map((card) => (
              <div className="col-md-6 col-lg-4" key={card.title}>
                <article className="contact-card h-100">
                  <div className="contact-card-icon">
                    <i className={`fa ${card.icon}`}></i>
                  </div>
                  <h4>{card.title}</h4>
                  <p className="mb-0">{card.detail}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-main py-5">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-6">
              <div className="contact-form-wrap">
                <span className="contact-section-label">Send A Message</span>
                <h2 className="mt-3 mb-4">
                  Tell us what you need and we'll point you in the right direction.
                </h2>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <select
                        name="service"
                        className="form-select"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">Select Service</option>
                        <option value="Royalz Tint">Royalz Tint</option>
                        <option value="Royalz Full Combo">Royalz Full Combo</option>
                        <option value="Royalz Wrap">Royalz Wrap</option>
                        <option value="Detailing Consultation">Detailing Consultation</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <textarea
                        name="message"
                        className="form-control"
                        rows="6"
                        placeholder="Tell us about your vehicle, service goal, or preferred booking date."
                        value={form.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    {feedback.message && (
                      <div className="col-12">
                        <div className={`alert alert-${feedback.type} mb-0`}>{feedback.message}</div>
                      </div>
                    )}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary py-3 px-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Inquiry"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-aside">
                <div className="contact-aside-card">
                  <span className="contact-section-label dark">Why Reach Out</span>
                  <h3 className="mt-3">We help you book with more confidence.</h3>
                  <p>
                    If you are not sure which package fits your vehicle, we can help you narrow it
                    down before booking. That means less guesswork and a smoother visit.
                  </p>
                  <ul className="contact-check-list list-unstyled mb-0">
                    <li>
                      <i className="fa fa-check"></i>
                      <span>Clear service recommendations</span>
                    </li>
                    <li>
                      <i className="fa fa-check"></i>
                      <span>Booking and scheduling support</span>
                    </li>
                    <li>
                      <i className="fa fa-check"></i>
                      <span>Answers for pricing and prep questions</span>
                    </li>
                  </ul>
                </div>

                <div className="contact-hours-card mt-4">
                  <h4 className="mb-3">Shop Hours</h4>
                  <div className="contact-hours-row">
                    <span>Monday - Friday</span>
                    <strong>9:00 AM - 9:00 PM</strong>
                  </div>
                  <div className="contact-hours-row">
                    <span>Saturday - Sunday</span>
                    <strong>9:00 AM - 12:00 PM</strong>
                  </div>
                </div>

                <div className="contact-map-card mt-4">
                  <h4 className="mb-3">Service Area</h4>
                  <p className="mb-0">
                    Royalz Auto Detailing is based in Halifax and serves clients looking for premium
                    detailing, tint, wraps, and vehicle protection work.
                  </p>
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
