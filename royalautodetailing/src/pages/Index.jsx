import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./home.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Seo from "../components/Seo";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { useAdminAuth } from "../context/AdminAuthContext";
import { apiPost } from "../lib/api";
import { buildLocalBusinessSchema, buildWebPageSchema } from "../lib/seo";

function createInquiryFormState() {
    return {
        name: "",
        email: "",
        service: "",
        preferredDate: "",
        message: ""
    };
}

function Index() {
    const title = "Premium Auto Detailing in Halifax";
    const description =
        "Royalz Auto Detailing offers premium ceramic coating, tint, wraps, paint protection, and detailing services in Halifax, Nova Scotia.";

    const scrollToPricingPlan = () => {
        const pricingSection = document.getElementById("pricing-plan");

        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Check admin login status
    const galleryData = [
        {
            title: "My Car",
            desc: "Your car is a reflection of your personality. We provide premium detailing, paint protection, and enhancement services to keep your vehicle looking brand new.",
            img: "/img/car.jpg"
        },
        {
            title: "Trucks",
            desc: "Heavy-duty vehicles require specialized care. We handle trucks with advanced cleaning, polishing, and protection techniques for long-lasting durability.",
            img: "/img/truck.jpg"
        },
        {
            title: "My Fleet",
            desc: "Maintain a clean and professional fleet. Our services ensure all vehicles stay spotless while minimizing downtime for your business operations.",
            img: "/img/fleet.jpg"
        },
        {
            title: "My Boat",
            desc: "Marine detailing services designed to protect against salt, water, and environmental damage, keeping your boat in top condition.",
            img: "/img/ship.jpg"
        },
        {
            title: "My Motorcycle",
            desc: "Precision detailing for motorcycles including cleaning, polishing, and protection for every component from engine to wheels.",
            img: "/img/bike.jpg"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const { isAdmin } = useAdminAuth();
    const [showAdminToast, setShowAdminToast] = useState(isAdmin);
    const [inquiryForm, setInquiryForm] = useState(createInquiryFormState());
    const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
    const [inquiryFeedback, setInquiryFeedback] = useState({ type: "", message: "" });

    useEffect(() => {
        if (isAdmin) {
            setShowAdminToast(true);
            const timer = setTimeout(() => setShowAdminToast(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [isAdmin]);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const handleInquiryChange = (event) => {
        const { name, value } = event.target;
        setInquiryForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleInquirySubmit = async (event) => {
        event.preventDefault();
        setIsSubmittingInquiry(true);
        setInquiryFeedback({ type: "", message: "" });

        try {
            await apiPost("/api/inquiries", {
                source: "homepage",
                name: inquiryForm.name,
                email: inquiryForm.email,
                service: inquiryForm.service,
                preferredDate: inquiryForm.preferredDate,
                message: inquiryForm.message,
            });

            setInquiryForm(createInquiryFormState());
            setInquiryFeedback({
                type: "success",
                message: "Your inquiry has been saved. The Royalz team can now review it in the dashboard.",
            });
        } catch (error) {
            setInquiryFeedback({
                type: "danger",
                message: error.message || "Unable to send your inquiry right now.",
            });
        } finally {
            setIsSubmittingInquiry(false);
        }
    };

    return (
        <div>
            <Seo
                title={title}
                description={description}
                path="/"
                schema={{
                    "@context": "https://schema.org",
                    "@graph": [
                        buildLocalBusinessSchema(),
                        buildWebPageSchema({
                            title,
                            description,
                            path: "/",
                        }),
                    ],
                }}
            />
            {showAdminToast && (
                <div
                    style={{
                        position: 'fixed',
                        top: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                        minWidth: 220,
                        maxWidth: '90vw',
                        background: 'linear-gradient(90deg, #0866ff 0%, #00cdff 100%)',
                        color: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                        padding: '1rem 1.5rem',
                        fontWeight: 600,
                        fontSize: 18,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        animation: 'fadeInDown 0.5s',
                    }}
                    className="admin-toast"
                >
                    <span style={{ fontSize: 22, display: 'flex', alignItems: 'center' }}>
                        <i className="fas fa-user-shield"></i>
                    </span>
                    <span>Welcome, Admin!</span>
                </div>
            )}
            <>

                <SiteHeader activePage="home" />
                {/* Carousel Start */}
                <div className="container-fluid p-0 mb-5 home-hero">
                    <div
                        id="header-carousel"
                        className="carousel slide"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="w-100" src="img/carousel-bg-1.jpg" alt="Royalz Auto Detailing hero background" />
                                <div className="carousel-caption d-flex align-items-center">
                                    <div className="container">
                                        <div className="row align-items-center justify-content-center justify-content-lg-start">
                                            <div className="col-10 col-lg-7 text-center text-lg-start">

                                                <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">
                                                    ROYALZ AUTO DETAILING
                                                </h1>
                                                <h6 className="text-white text-uppercase mb-3  animated slideInDown">
                                                    PROFESSIONAL AND FAST AUTO DETAILING SERVICES IN HALIFAX
                                                </h6>
                                                <Link
                                                    to="/booking"
                                                    className="btn btn-primary py-3 px-5 mt-3 animated slideInDown"
                                                >
                                                    Book Now
                                                </Link>
                                            </div>
                                            <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                                                <img className="img-fluid" src="img/carousel-1.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="carousel-item">
                                <img className="w-100" src="img/carousel-bg-2.jpg" alt="Image" />
                                <div className="carousel-caption d-flex align-items-center">
                                    <div className="container">
                                        <div className="row align-items-center justify-content-center justify-content-lg-start">
                                            <div className="col-10 col-lg-7 text-center text-lg-start">
                                                <h6 className="text-white text-uppercase mb-3 animated slideInDown">
                                                    Ppf | Ceramic | Wrap | Tint
                                                </h6>
                                                <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">
                                                    Specialized Services for All Your Vehicles
                                                </h1>
                                                <a
                                                    href=""
                                                    className="btn btn-primary py-3 px-5 animated slideInDown"
                                                >
                                                    At ROYALz, we understand that each type of vehicle has unique detailing needs. That’s why we offer specialized services tailored to cars, trucks, fleets, boats, and motorcycles. Our expert team is equipped to handle the specific requirements of each vehicle, ensuring top-notch results every time.
                                                </a>
                                            </div>
                                            <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                                                <img className="img-fluid" src="img/carousel-2.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#header-carousel"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#header-carousel"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button> */}
                    </div>
                </div>
                {/* Carousel End */}
                {/* Service Start */}
                <div className="container-xxl pt-3 pb-5">
                    <div className="container">
                        <div className="row g-4">

                            {/* 1 */}
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="service-box p-4 h-100">
                                    <div className="service-icon mb-3">
                                        <i className="fa fa-certificate"></i>
                                    </div>
                                    <h5>Ceramic Coating</h5>
                                    <p>
                                        Protect your car's paint with advanced ceramic coating for long-lasting shine and protection.
                                    </p>
                                    <button type="button" className="service-link service-link-button" onClick={scrollToPricingPlan}>Learn More</button>
                                </div>
                            </div>

                            {/* 2 */}
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="service-box p-4 h-100">
                                    <div className="service-icon mb-3">
                                        <i className="fa fa-car"></i>
                                    </div>
                                    <h5>Window Tinting</h5>
                                    <p>
                                        Improve privacy and reduce heat with premium window tinting services.
                                    </p>
                                    <button type="button" className="service-link service-link-button" onClick={scrollToPricingPlan}>Learn More</button>
                                </div>
                            </div>

                            {/* 3 */}
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="service-box p-4 h-100">
                                    <div className="service-icon mb-3">
                                        <i className="fa fa-tools"></i>
                                    </div>
                                    <h5>Vehicle Wraps</h5>
                                    <p>
                                        Custom wraps to transform your car's look with unique styles and branding.
                                    </p>
                                    <button type="button" className="service-link service-link-button" onClick={scrollToPricingPlan}>Learn More</button>
                                </div>
                            </div>

                            {/* 4 */}
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                                <div className="service-box p-4 h-100">
                                    <div className="service-icon mb-3">
                                        <i className="fa fa-shield-alt"></i>
                                    </div>
                                    <h5>Paint Protection Film</h5>
                                    <p>
                                        Protect your vehicle from scratches, chips, and damage with high-quality PPF.
                                    </p>
                                    <button type="button" className="service-link service-link-button" onClick={scrollToPricingPlan}>Learn More</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Service End */}
                {/* About Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-6 pt-4" style={{ minHeight: 400 }}>
                                <div
                                    className="position-relative h-100 wow fadeIn"
                                    data-wow-delay="0.1s"
                                >
                                    <img
                                        className="position-absolute img-fluid w-100 h-100"
                                        src="img/about.jpg"
                                        style={{ objectFit: "cover" }}
                                        alt=""
                                    />
                                    <div
                                        className="position-absolute top-0 end-0 mt-n4 me-n4 py-4 px-5 home-about-badge"
                                        style={{ background: "rgba(0, 0, 0, .08)" }}
                                    >
                                        <h1 className="display-4 text-white mb-0">
                                            15 <span className="fs-4">Years</span>
                                        </h1>
                                        <h4 className="text-white">Experience</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h1 className="mb-4">Why Trust Us?</h1>
                                <h6 className="text-primary text-uppercase mb-5">Delivering quality, transparency, and results you can rely on.</h6>

                                {/* <ul>
                                    <li>Experienced Professionals – Honest service every time.</li>
                                    <li>Transparent Pricing – No hidden charges.</li>
                                    <li>Fast Turnaround – Get your car back on the road swiftly.</li>
                                    <li>Advanced Equipment – Using the latest technology for accurate diagnostics.</li>
                                </ul> */}
                                <div className="row g-4 mb-3 pb-3">
                                    <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                                        <div className="d-flex">
                                            <div
                                                className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                                                style={{ width: 45, height: 45 }}
                                            >
                                                <span className="fw-bold text-secondary">01</span>
                                            </div>
                                            <div className="ps-3">
                                                <h6>Experienced Professionals</h6>
                                                <span>Honest service every time</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                                        <div className="d-flex">
                                            <div
                                                className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                                                style={{ width: 45, height: 45 }}
                                            >
                                                <span className="fw-bold text-secondary">02</span>
                                            </div>
                                            <div className="ps-3">
                                                <h6>Transparent Pricing</h6>
                                                <span>No hidden charges.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                                        <div className="d-flex">
                                            <div
                                                className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                                                style={{ width: 45, height: 45 }}
                                            >
                                                <span className="fw-bold text-secondary">03</span>
                                            </div>
                                            <div className="ps-3">
                                                <h6>Fast Turnaround</h6>
                                                <span>Get your car back on the road swiftly.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 wow fadeIn" data-wow-delay="0.7s">
                                        <div className="d-flex">
                                            <div
                                                className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                                                style={{ width: 45, height: 45 }}
                                            >
                                                <span className="fw-bold text-secondary">04</span>
                                            </div>
                                            <div className="ps-3">
                                                <h6>Advanced Equipment</h6>
                                                <span>Using modern tools and premium materials for dependable results.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/about" className="btn btn-primary py-3 px-5">
                                    Read More
                                    <i className="fa fa-arrow-right ms-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About End */}
                {/* Fact Start */}
                <div ref={ref} className="container-fluid fact bg-dark my-5 py-5">
                    <div className="container">
                        <div className="row g-4">

                            {/* 1 */}
                            <div className="col-md-6 col-lg-3 text-center">
                                <i className="fa fa-check fa-2x text-white mb-3" />
                                <h2 className="text-white mb-2">
                                    {inView && <CountUp end={15} duration={2} />}
                                </h2>
                                <p className="text-white mb-0">Years Experience</p>
                            </div>

                            {/* 2 */}
                            <div className="col-md-6 col-lg-3 text-center">
                                <i className="fa fa-users-cog fa-2x text-white mb-3" />
                                <h2 className="text-white mb-2">
                                    {inView && <CountUp end={25} duration={2} />}
                                </h2>
                                <p className="text-white mb-0">Expert Technicians</p>
                            </div>

                            {/* 3 */}
                            <div className="col-md-6 col-lg-3 text-center">
                                <i className="fa fa-users fa-2x text-white mb-3" />
                                <h2 className="text-white mb-2">
                                    {inView && <CountUp end={1200} duration={2} />}+
                                </h2>
                                <p className="text-white mb-0">Satisfied Clients</p>
                            </div>

                            {/* 4 */}
                            <div className="col-md-6 col-lg-3 text-center">
                                <i className="fa fa-car fa-2x text-white mb-3" />
                                <h2 className="text-white mb-2">
                                    {inView && <CountUp end={850} duration={2} />}+
                                </h2>
                                <p className="text-white mb-0">Completed Projects</p>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Fact End */}
                {/* Service Start */}
                <div className="container-xxl service py-5" id="pricing-plan">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h1 className="mb-3">Pricing Plan</h1>
                            <h6 className="text-primary text-uppercase mb-3">Quality service. Clear pricing.</h6>

                        </div>
                        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="col-lg-4">
                                <div className="nav w-100 nav-pills me-4">
                                    <button
                                        className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 active"
                                        data-bs-toggle="pill"
                                        data-bs-target="#tab-pane-1"
                                        type="button"
                                    >
                                        <i className="fa fa-car-side fa-2x me-3" />
                                        <h4 className="m-0">RoyalZ Tint</h4>
                                    </button>
                                    <button
                                        className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
                                        data-bs-toggle="pill"
                                        data-bs-target="#tab-pane-2"
                                        type="button"
                                    >
                                        <i className="fa fa-car fa-2x me-3" />
                                        <h4 className="m-0">RoyalZ Full Combos</h4>
                                    </button>
                                    <button
                                        className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
                                        data-bs-toggle="pill"
                                        data-bs-target="#tab-pane-3"
                                        type="button"
                                    >
                                        <i className="fa fa-cog fa-2x me-3" />
                                        <h4 className="m-0">RoyalZ Wraps</h4>
                                    </button>
                                    {/* <button
                                        className="nav-link w-100 d-flex align-items-center text-start p-4 mb-0"
                                        data-bs-toggle="pill"
                                        data-bs-target="#tab-pane-4"
                                        type="button"
                                    >
                                        <i className="fa fa-oil-can fa-2x me-3" />
                                        <h4 className="m-0">Oil Changing</h4>
                                    </button> */}
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="tab-content w-100">
                                    <div className="tab-pane fade show active" id="tab-pane-1">
                                        <div className="row g-4">
                                            <div className="col-md-6" style={{ minHeight: 350 }}>
                                                <div className="position-relative h-100">
                                                    <img
                                                        className="position-absolute img-fluid w-100 h-100"
                                                        src="img/tint.jpg"
                                                        style={{ objectFit: "cover" }}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h4 className="mb-3">
                                                    Services Include in package :
                                                </h4>
                                                {/* <p className="mb-4">
                                                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                                                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                                                    sit, sed stet lorem sit clita duo justo magna dolore erat
                                                    amet
                                                </p> */}
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Full Sedan

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Full SUV

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Sedan (Rear Half of the Car)

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Headlights Tint

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Taillights Tint

                                                </p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">

                                                    {/* Price */}
                                                    <div className="mb-4">
                                                        <small className="text-muted">Starting from</small>
                                                        <h3 className="mb-0 text-primary">$99</h3>
                                                    </div>

                                                    {/* Button */}
                                                    <Link to="/booking" className="btn btn-primary py-2 px-4 py-2">
                                                        Book Now <i className="fa fa-arrow-right ms-2" />
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-2">
                                        <div className="row g-4">
                                            <div className="col-md-6" style={{ minHeight: 350 }}>
                                                <div className="position-relative h-100">
                                                    <img
                                                        className="position-absolute img-fluid w-100 h-100"
                                                        src="img/interior.jpg"
                                                        style={{ objectFit: "cover" }}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h4 className="mb-3">
                                                    Services Include in package :
                                                </h4>
                                                {/* <p className="mb-4">
                                                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                                                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                                                    sit, sed stet lorem sit clita duo justo magna dolore erat
                                                    amet
                                                </p> */}
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Full Car Detailing

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Full Interior Detailing (Including Seat Cleaning)


                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Interior Detailing (Without Seat Cleaning)


                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Full Exterior Cleaning Supreme Combo Pack


                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Full Interior Cleaning Supreme Combo Pack

                                                </p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">

                                                    {/* Price */}
                                                    <div className="mb-4">
                                                        <small className="text-muted">Starting from</small>
                                                        <h3 className="mb-0 text-primary">$120</h3>
                                                    </div>

                                                    {/* Button */}
                                                    <Link to="/booking" className="btn btn-primary py-2 px-4 py-2">
                                                        Book Now <i className="fa fa-arrow-right ms-2" />
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-3">
                                        <div className="row g-4">
                                            <div className="col-md-6" style={{ minHeight: 350 }}>
                                                <div className="position-relative h-100">
                                                    <img
                                                        className="position-absolute img-fluid w-100 h-100"
                                                        src="img/wrap.jpg"
                                                        style={{ objectFit: "cover" }}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h4 className="mb-3">
                                                    Services Include in package :
                                                </h4>
                                                {/* <p className="mb-4">
                                                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                                                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                                                    sit, sed stet lorem sit clita duo justo magna dolore erat
                                                    amet
                                                </p> */}
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Hood

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Roof

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Front Bumper

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Rear Bumper

                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Full Car Wrap


                                                </p>
                                                <div className="d-flex justify-content-between align-items-center mt-4">

                                                    {/* Price */}
                                                    <div className="mb-4">
                                                        <small className="text-muted">Starting from</small>
                                                        <h3 className="mb-0 text-primary">$150</h3>
                                                    </div>

                                                    {/* Button */}
                                                    <Link to="/booking" className="btn btn-primary py-2 px-4 py-2">
                                                        Book Now <i className="fa fa-arrow-right ms-2" />
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="tab-pane fade" id="tab-pane-4">
                                        <div className="row g-4">
                                            <div className="col-md-6" style={{ minHeight: 350 }}>
                                                <div className="position-relative h-100">
                                                    <img
                                                        className="position-absolute img-fluid w-100 h-100"
                                                        src="img/service-4.jpg"
                                                        style={{ objectFit: "cover" }}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h3 className="mb-3">
                                                    15 Years Of Experience In Auto Servicing
                                                </h3>
                                                <p className="mb-4">
                                                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                                                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                                                    sit, sed stet lorem sit clita duo justo magna dolore erat
                                                    amet
                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Quality Servicing
                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Expert Workers
                                                </p>
                                                <p>
                                                    <i className="fa fa-check text-success me-3" />
                                                    Modern Equipment
                                                </p>
                                                <a href="" className="btn btn-primary py-3 px-5 mt-3">
                                                    Read More
                                                    <i className="fa fa-arrow-right ms-3" />
                                                </a>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Service End */}
                {/* Booking Start */}
                <div
                    className="container-fluid bg-secondary booking my-5 wow fadeInUp"
                    data-wow-delay="0.1s"
                >
                    <div className="container">
                        <div className="row gx-5">
                            <div className="col-lg-6 py-5">
                                <div className="py-5">
                                    <h1 className="text-white mb-4">
                                        Premium auto detailing for drivers who care about the finish
                                    </h1>
                                    <p className="text-white mb-0">
                                        We provide high-end auto detailing services tailored to keep your vehicle looking brand new.
                                        Our expert team uses advanced techniques and premium products to ensure unmatched shine, protection, and care.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn home-contact-card"
                                    data-wow-delay="0.6s"
                                >
                                    <h1 className="text-white mb-4">Have a question? Reach out.</h1>
                                    <form onSubmit={handleInquirySubmit}>
                                        <div className="row g-3">
                                            <div className="col-12 col-sm-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control border-0"
                                                    placeholder="Your Name"
                                                    value={inquiryForm.name}
                                                    onChange={handleInquiryChange}
                                                    style={{ height: 55 }}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control border-0"
                                                    placeholder="Your Email"
                                                    value={inquiryForm.email}
                                                    onChange={handleInquiryChange}
                                                    style={{ height: 55 }}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <select
                                                    name="service"
                                                    className="form-select border-0"
                                                    value={inquiryForm.service}
                                                    onChange={handleInquiryChange}
                                                    style={{ height: 55 }}
                                                >
                                                    <option value="">Select Service</option>
                                                    <option value="Royalz Tint">Royalz Tint</option>
                                                    <option value="Royalz Full Combo">Royalz Full Combo</option>
                                                    <option value="Royalz Wrap">Royalz Wrap</option>
                                                    <option value="Detailing Consultation">Detailing Consultation</option>
                                                </select>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <input
                                                    type="date"
                                                    name="preferredDate"
                                                    className="form-control border-0"
                                                    aria-label="Service Date"
                                                    value={inquiryForm.preferredDate}
                                                    onChange={handleInquiryChange}
                                                    style={{ height: 55 }}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <textarea
                                                    name="message"
                                                    className="form-control border-0"
                                                    placeholder="Special Request"
                                                    value={inquiryForm.message}
                                                    onChange={handleInquiryChange}
                                                    required
                                                />
                                            </div>
                                            {inquiryFeedback.message && (
                                                <div className="col-12">
                                                    <div className={`alert alert-${inquiryFeedback.type} mb-0 text-start`}>
                                                        {inquiryFeedback.message}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-secondary w-100 py-3"
                                                    type="submit"
                                                    disabled={isSubmittingInquiry}
                                                >
                                                    {isSubmittingInquiry ? "Sending..." : "Send Inquiry"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Booking End */}
                {/* Team Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h1 className="mb-5">Premium Services for Every Vehicle</h1>
                            <h6 className="text-primary text-uppercase">From cars to fleets, we deliver professional detailing and protection services tailored to your needs.</h6>

                        </div>
                        <div className="row mt-4 align-items-center">

                            {/* LEFT THUMBNAILS */}
                            <div className="col-12 col-sm-2 d-flex gap-3 home-gallery-thumbs">
                                {galleryData.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item.img}
                                        alt={`${item.title} thumbnail`}
                                        onClick={() => setActiveIndex(index)}
                                        className={`img-fluid rounded ${activeIndex === index ? "border border-danger border-3" : ""
                                            }`}
                                        style={{
                                            cursor: "pointer",
                                            height: "70px",
                                            objectFit: "cover"
                                        }}
                                    />
                                ))}
                            </div>

                            {/* RIGHT CONTENT */}
                            <div className="col-12 col-sm-10 home-gallery-content">

                                <div className="row align-items-center">

                                    {/* LEFT TEXT (NEW) */}
                                    <div className="col-md-5 mb-3 mb-md-0">

                                        <h3 className="fw-bold mb-3">
                                            {galleryData[activeIndex].title}
                                        </h3>

                                        <p className="text-muted">
                                            {galleryData[activeIndex].desc}
                                        </p>

                                        <Link to="/booking" className="btn btn-primary mt-2">
                                            Explore Service
                                        </Link>

                                    </div>

                                    {/* RIGHT IMAGE */}
                                    <div className="col-md-7 position-relative">

                                        <img
                                            key={activeIndex}
                                            src={galleryData[activeIndex].img}
                                            alt={galleryData[activeIndex].title}
                                            className="img-fluid rounded w-100 fade-image home-gallery-image"
                                            style={{
                                                height: "350px",
                                                objectFit: "cover"
                                            }}
                                        />

                                        {/* OPTIONAL SMALL OVERLAY (BOTTOM ONLY) */}
                                        {/* <div
                                            className="position-absolute bottom-0 start-0 w-100 p-3"
                                            style={{
                                                background: "rgba(0,0,0,0.5)",
                                                borderBottomLeftRadius: "8px",
                                                borderBottomRightRadius: "8px"
                                            }}
                                        >
                                            <small className="text-white">
                                                {galleryData[activeIndex].title}
                                            </small>
                                        </div> */}

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {/* Team End */}
                {/* Testimonial Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center">
                            {/* <h6 className="text-primary text-uppercase">// Testimonial //</h6> */}
                            <h1 className="mb-5">Trusted by Our Customers</h1>
                        </div>

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={3}
                            loop={false}
                            autoplay={{ delay: 2500 }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                992: { slidesPerView: 3 },
                            }}
                        >

                            {/* Slide 1 */}
                            <SwiperSlide>
                                <div className="testimonial-item text-center bg-light p-4">
                                    <img
                                        className="bg-light rounded-circle p-2 mx-auto mb-3"
                                        src="/img/testimonial-1.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <h5 className="mb-0">Rishu</h5>
                                    {/* <p>Profession</p> */}
                                    <div className="testimonial-text text-center p-4">
                                        <div className="mb-2 text-warning">
                                            5/5
                                        </div>
                                        <p className="mb-0">
                                            Had an amazing experience at Royalz Auto Detailing. A big shoutout to Baldeep and Simmu for doing a phenomenal job on my car.
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 2 */}
                            <SwiperSlide>
                                <div className="testimonial-item text-center bg-light p-4">
                                    <img
                                        className="bg-light rounded-circle p-2 mx-auto mb-3"
                                        src="/img/testimonial-2.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <h5 className="mb-0">Johnsondeep Singh</h5>
                                    {/* <p>Profession</p> */}
                                    <div className="testimonial-text bg-light text-center p-4">
                                        <div className="mb-2 text-warning">
                                            5/5
                                        </div>
                                        <p className="mb-0">
                                            Very good service! I got full car deep cleaning and ceramic coating done. The results were excellent and I'm really satisfied.
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 3 */}
                            <SwiperSlide>
                                <div className="testimonial-item text-center bg-light p-4">
                                    <img
                                        className="bg-light rounded-circle p-2 mx-auto mb-3"
                                        src="/img/testimonial-3.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <h5 className="mb-0">Kiranpreet Singh</h5>
                                    {/* <p>Profession</p> */}
                                    <div className="testimonial-text bg-light text-center p-4">
                                        <div className="mb-2 text-warning">
                                            5/5
                                        </div>
                                        <p className="mb-0">
                                            Royalz Auto Detailing is hands down the best in Halifax! They transformed my car inside and out, and it looks brand new.
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 4 */}
                            <SwiperSlide>
                                <div className="testimonial-item text-center bg-light p-4">
                                    <img
                                        className="bg-light rounded-circle p-2 mx-auto mb-3"
                                        src="/img/testimonial-4.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <h5 className="mb-0">Ian David Cowan</h5>
                                    {/* <p>Profession</p> */}
                                    <div className="testimonial-text bg-light text-center p-4">
                                        <div className="mb-2 text-warning">
                                            ★★★★★
                                        </div>
                                        <p className="mb-0">
                                            I recently purchased a used car that wasn’t properly detailed, but Royalz Auto Detailing completely turned it around.
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
                {/* Testimonial End */}
                <SiteFooter />
            </>



        </div>
    );
}

export default Index;

