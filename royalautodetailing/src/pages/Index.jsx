import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Index() {
    // Check admin login status
    const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';
    const [showAdminToast, setShowAdminToast] = useState(isAdmin);

    useEffect(() => {
        if (isAdmin) {
            setShowAdminToast(true);
            const timer = setTimeout(() => setShowAdminToast(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [isAdmin]);

    return (
        <div>
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
                    <span style={{fontSize: 22, display: 'flex', alignItems: 'center'}}>
                        <i className="fas fa-user-shield"></i>
                    </span>
                    <span>Welcome, Admin!</span>
                </div>
            )}
			<>

                {/* Topbar Start */}
                <div className="container-fluid bg-light p-0">
                    <div className="row gx-0 d-none d-lg-flex">
                        <div className="col-lg-7 px-5 text-start">
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                                <small className="fa fa-map-marker-alt text-primary me-2" />
                                <small>90 horseshoe lake drive Halifax B3S0B4</small>
                            </div>
                            <div className="h-100 d-inline-flex align-items-center py-3">
                                <small className="far fa-clock text-primary me-2" />
                                <small>Phone: +1 (782) 882-0667</small>
                            </div>
                        </div>
                        <div className="col-lg-5 px-5 text-end">
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                                <small className="fa fa-phone-alt text-primary me-2" />
                                <small>Phone: +1 (902) 412-2913</small>
                            </div>
                            <div className="h-100 d-inline-flex align-items-center">
                                <a className="btn btn-sm-square bg-white text-primary me-1" href="">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a className="btn btn-sm-square bg-white text-primary me-1" href="">
                                    <i className="fab fa-twitter" />
                                </a>
                                <a className="btn btn-sm-square bg-white text-primary me-1" href="">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                                <a className="btn btn-sm-square bg-white text-primary me-0" href="">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Topbar End */}
                {/* Navbar Start */}
                <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                    <a
                        href="index.html"
                        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
                    >
                        <h2 className="m-0 text-primary">
                            <i className="fa fa-car me-3" />
                            ROYALz Auto Detailing
                        </h2>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler me-4"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <a href="index.html" className="nav-item nav-link active">
                                Home
                            </a>
                            <a href="about.html" className="nav-item nav-link">
                                About Us
                            </a>
                            <a href="service.html" className="nav-item nav-link">
                                Services
                            </a>
                            <div className="nav-item dropdown">
                                <a
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                >
                                    Book Services
                                </a>
                                <div className="dropdown-menu fade-up m-0">
                                    <a href="booking.html" className="dropdown-item">
                                        Booking
                                    </a>
                                    <a href="team.html" className="dropdown-item">
                                        Technicians
                                    </a>
                                    <a href="testimonial.html" className="dropdown-item">
                                        Testimonial
                                    </a>
                                    <a href="404.html" className="dropdown-item">
                                        404 Page
                                    </a>
                                </div>
                            </div>
                            <a href="contact.html" className="nav-item nav-link">
                                Contact Us
                            </a>
                            {isAdmin && (
                                <a href="/admin-dashboard" className="nav-item nav-link text-warning fw-bold">
                                    <i className="fas fa-user-shield me-2"></i>Admin Dashboard
                                </a>
                            )}
                        </div>
                        <a href="" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
                            Book Now
                            <i className="fa fa-arrow-right ms-3" />
                        </a>
                    </div>
                </nav>
                {/* Navbar End */}
                {/* Carousel Start */}
                <div className="container-fluid p-0 mb-5">
                    <div
                        id="header-carousel"
                        className="carousel slide"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="w-100" src="img/carousel-bg-1.jpg" alt="Image" />
                                <div className="carousel-caption d-flex align-items-center">
                                    <div className="container">
                                        <div className="row align-items-center justify-content-center justify-content-lg-start">
                                            <div className="col-10 col-lg-7 text-center text-lg-start">
                                                <h6 className="text-white text-uppercase mb-3 animated slideInDown">
                                                PROFESSIONAL AND FAST
                                                </h6>
                                                <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">
                                                    ROYALz Auto Detailing
                                                </h1>
                                                <a
                                                    href=""
                                                    className="btn btn-primary py-3 px-5 animated slideInDown"
                                                >
                                                    Scroll Down
                                                </a>
                                            </div>
                                            <div className="col-lg-5 d-none d-lg-flex animated zoomIn">
                                                <img className="img-fluid" src="img/carousel-1.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
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
                            </div>
                        </div>
                        <button
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
                        </button>
                    </div>
                </div>
                {/* Carousel End */}
                {/* Service Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="d-flex py-5 px-4">
                                    <i className="fa fa-certificate fa-3x text-primary flex-shrink-0" />
                                    <div className="ps-4">
                                        <h5 className="mb-3">Ceramic Coating</h5>
                                        <p>Protect your car’s paint with our advanced ceramic coating services. Ceramic coatings provide a durable, high-gloss finish that shields your vehicle from environmental contaminants, UV rays, and minor scratches.</p>
                                        <a className="text-secondary border-bottom" href="">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="d-flex bg-light py-5 px-4">
                                    <i className="fa fa-users-cog fa-3x text-primary flex-shrink-0" />
                                    <div className="ps-4">
                                        <h5 className="mb-3">Window Tinting</h5>
                                        <p>Enhance your vehicle's privacy and reduce glare with our premium window tinting services. Our high-quality tints offer superior heat rejection and UV protection, ensuring a cooler and more comfortable ride.</p>
                                        <a className="text-secondary border-bottom" href="">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="d-flex py-5 px-4">
                                    <i className="fa fa-tools fa-3x text-primary flex-shrink-0" />
                                    <div className="ps-4">
                                        <h5 className="mb-3">Vehicle Wraps</h5>
                                        <p>Transform the look of your car with custom vehicle wraps. Whether you want a full-color change, unique graphics, or brand advertising, our expert team will deliver a flawless finish that stands out.</p>
                                        <a className="text-secondary border-bottom" href="">
                                            Read More
                                        </a>
                                    </div>
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
                                        className="position-absolute top-0 end-0 mt-n4 me-n4 py-4 px-5"
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
                                <h6 className="text-primary text-uppercase">// Why Trust Us? //</h6>
                                <h1 className="mb-4">Why Trust Us?</h1>
                                <ul>
                                    <li>Experienced Professionals – Honest service every time.</li>
                                    <li>Transparent Pricing – No hidden charges.</li>
                                    <li>Fast Turnaround – Get your car back on the road swiftly.</li>
                                    <li>Advanced Equipment – Using the latest technology for accurate diagnostics.</li>
                                </ul>
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
                                                <h6>Professional &amp; Expert</h6>
                                                <span>Diam dolor diam ipsum sit amet diam et eos</span>
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
                                                <h6>Quality Servicing Center</h6>
                                                <span>Diam dolor diam ipsum sit amet diam et eos</span>
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
                                                <h6>Awards Winning Workers</h6>
                                                <span>Diam dolor diam ipsum sit amet diam et eos</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="" className="btn btn-primary py-3 px-5">
                                    Read More
                                    <i className="fa fa-arrow-right ms-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About End */}
                {/* Fact Start */}
                <div className="container-fluid fact bg-dark my-5 py-5">
                    <div className="container">
                        <div className="row g-4">
                            <div
                                className="col-md-6 col-lg-3 text-center wow fadeIn"
                                data-wow-delay="0.1s"
                            >
                                <i className="fa fa-check fa-2x text-white mb-3" />
                                <h2 className="text-white mb-2" data-toggle="counter-up">
                                    1234
                                </h2>
                                <p className="text-white mb-0">Years Experience</p>
                            </div>
                            <div
                                className="col-md-6 col-lg-3 text-center wow fadeIn"
                                data-wow-delay="0.3s"
                            >
                                <i className="fa fa-users-cog fa-2x text-white mb-3" />
                                <h2 className="text-white mb-2" data-toggle="counter-up">
                                    1234
                                </h2>
                                <p className="text-white mb-0">Expert Technicians</p>
                            </div>
                            <div
                                className="col-md-6 col-lg-3 text-center wow fadeIn"
                                data-wow-delay="0.5s"
                            >
                                <i className="fa fa-users fa-2x text-white mb-3" />
                                <h2 className="text-white mb-2" data-toggle="counter-up">
                                    1234
                                </h2>
                                <p className="text-white mb-0">Satisfied Clients</p>
                            </div>
                            <div
                                className="col-md-6 col-lg-3 text-center wow fadeIn"
                                data-wow-delay="0.7s"
                            >
                                <i className="fa fa-car fa-2x text-white mb-3" />
                                <h2 className="text-white mb-2" data-toggle="counter-up">
                                    1234
                                </h2>
                                <p className="text-white mb-0">Compleate Projects</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fact End */}
                {/* Service Start */}
                <div className="container-xxl service py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="text-primary text-uppercase">// Pricing Plan //</h6>
                                <h1 className="mb-5">Pricing Plan</h1>
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
                                        <h4 className="m-0">Diagnostic Test</h4>
                                    </button>
                                    <button
                                        className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
                                        data-bs-toggle="pill"
                                        data-bs-target="#tab-pane-2"
                                        type="button"
                                    >
                                        <i className="fa fa-car fa-2x me-3" />
                                        <h4 className="m-0">Engine Servicing</h4>
                                    </button>
                                    <button
                                        className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
                                        data-bs-toggle="pill"
                                        data-bs-target="#tab-pane-3"
                                        type="button"
                                    >
                                        <i className="fa fa-cog fa-2x me-3" />
                                        <h4 className="m-0">Tires Replacement</h4>
                                    </button>
                                    <button
                                        className="nav-link w-100 d-flex align-items-center text-start p-4 mb-0"
                                        data-bs-toggle="pill"
                                        data-bs-target="#tab-pane-4"
                                        type="button"
                                    >
                                        <i className="fa fa-oil-can fa-2x me-3" />
                                        <h4 className="m-0">Oil Changing</h4>
                                    </button>
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
                                                        src="img/service-1.jpg"
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
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-2">
                                        <div className="row g-4">
                                            <div className="col-md-6" style={{ minHeight: 350 }}>
                                                <div className="position-relative h-100">
                                                    <img
                                                        className="position-absolute img-fluid w-100 h-100"
                                                        src="img/service-2.jpg"
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
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-3">
                                        <div className="row g-4">
                                            <div className="col-md-6" style={{ minHeight: 350 }}>
                                                <div className="position-relative h-100">
                                                    <img
                                                        className="position-absolute img-fluid w-100 h-100"
                                                        src="img/service-3.jpg"
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
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-4">
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
                                    </div>
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
                                        Certified and Award Winning Car Repair Service Provider
                                    </h1>
                                    <p className="text-white mb-0">
                                        Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd
                                        ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo
                                        rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod
                                        et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit.
                                        Sea dolore sanctus sed et. Takimata takimata sanctus sed.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn"
                                    data-wow-delay="0.6s"
                                >
                                    <h1 className="text-white mb-4">Book For A Service</h1>
                                    <form>
                                        <div className="row g-3">
                                            <div className="col-12 col-sm-6">
                                                <input
                                                    type="text"
                                                    className="form-control border-0"
                                                    placeholder="Your Name"
                                                    style={{ height: 55 }}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <input
                                                    type="email"
                                                    className="form-control border-0"
                                                    placeholder="Your Email"
                                                    style={{ height: 55 }}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <select
                                                    className="form-select border-0"
                                                    style={{ height: 55 }}
                                                >
                                                    <option selected="">Select A Service</option>
                                                    <option value={1}>Service 1</option>
                                                    <option value={2}>Service 2</option>
                                                    <option value={3}>Service 3</option>
                                                </select>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div className="date" id="date1" data-target-input="nearest">
                                                    <input
                                                        type="text"
                                                        className="form-control border-0 datetimepicker-input"
                                                        placeholder="Service Date"
                                                        data-target="#date1"
                                                        data-toggle="datetimepicker"
                                                        style={{ height: 55 }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <textarea
                                                    className="form-control border-0"
                                                    placeholder="Special Request"
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-secondary w-100 py-3"
                                                    type="submit"
                                                >
                                                    Book Now
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
                            <h6 className="text-primary text-uppercase">// Our Technicians //</h6>
                            <h1 className="mb-5">Our Expert Technicians</h1>
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="team-item">
                                    <div className="position-relative overflow-hidden">
                                        <img className="img-fluid" src="img/team-1.jpg" alt="" />
                                        <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="bg-light text-center p-4">
                                        <h5 className="fw-bold mb-0">Full Name</h5>
                                        <small>Designation</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="team-item">
                                    <div className="position-relative overflow-hidden">
                                        <img className="img-fluid" src="img/team-2.jpg" alt="" />
                                        <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="bg-light text-center p-4">
                                        <h5 className="fw-bold mb-0">Full Name</h5>
                                        <small>Designation</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="team-item">
                                    <div className="position-relative overflow-hidden">
                                        <img className="img-fluid" src="img/team-3.jpg" alt="" />
                                        <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="bg-light text-center p-4">
                                        <h5 className="fw-bold mb-0">Full Name</h5>
                                        <small>Designation</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                                <div className="team-item">
                                    <div className="position-relative overflow-hidden">
                                        <img className="img-fluid" src="img/team-4.jpg" alt="" />
                                        <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a className="btn btn-square mx-1" href="">
                                                <i className="fab fa-instagram" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="bg-light text-center p-4">
                                        <h5 className="fw-bold mb-0">Full Name</h5>
                                        <small>Designation</small>
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
                            <h6 className="text-primary text-uppercase">// Testimonial //</h6>
                            <h1 className="mb-5">Our Clients Say!</h1>
                        </div>

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={3}
                            loop={false}
                            autoplay={{ delay: 2500 }}
                            pagination={{ clickable: true }} // 👈 DOTS
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
                                    <h5 className="mb-0">Client Name</h5>
                                    <p>Profession</p>
                                    <div className="testimonial-text text-center p-4">
                                        <p className="mb-0">
                                            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet.
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
                                    <h5 className="mb-0">Client Name</h5>
                                    <p>Profession</p>
                                    <div className="testimonial-text bg-light text-center p-4">
                                        <p className="mb-0">
                                            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet.
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
                                    <h5 className="mb-0">Client Name</h5>
                                    <p>Profession</p>
                                    <div className="testimonial-text bg-light text-center p-4">
                                        <p className="mb-0">
                                            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet.
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
                                    <h5 className="mb-0">Client Name</h5>
                                    <p>Profession</p>
                                    <div className="testimonial-text bg-light text-center p-4">
                                        <p className="mb-0">
                                            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet.
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
                {/* Testimonial End */}
                {/* Footer Start */}
                <div
                    className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
                    data-wow-delay="0.1s"
                >
                    <div className="container py-5">
                        <div className="row g-5">
                            <div className="col-lg-3 col-md-6">
                                <h4 className="text-light mb-4">Contact</h4>
                                <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />90 horseshoe lake drive Halifax B3S0B4</p>
                                <p className="mb-2"><i className="fa fa-phone-alt me-3" />Phone: +1 (782) 882-0667</p>
                                <p className="mb-2"><i className="fa fa-phone-alt me-3" />Phone: +1 (902) 412-2913</p>
                                <div className="d-flex pt-2 mb-2">
                                    <a className="btn btn-outline-light btn-social" href="">
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a className="btn btn-outline-light btn-social" href="">
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a className="btn btn-outline-light btn-social" href="">
                                        <i className="fab fa-youtube" />
                                    </a>
                                    <a className="btn btn-outline-light btn-social" href="">
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                </div>
                                <a className="btn btn-warning w-100 mt-2" href="/admin-login">
                                    <i className="fas fa-user-shield me-2"></i>Admin Login
                                </a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h4 className="text-light mb-4">Useful links</h4>
                                <ul className="list-unstyled">
                                    <li><a className="text-light" href="/">Home</a></li>
                                    <li><a className="text-light" href="/about">About Us</a></li>
                                    <li><a className="text-light" href="/services">Services</a></li>
                                    <li><a className="text-light" href="/contact">Contact</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h4 className="text-light mb-4">Newsletter</h4>
                                <form>
                                    <input className="form-control mb-2" type="email" placeholder="email" />
                                    <button className="btn btn-primary w-100" type="submit">Subscribe</button>
                                </form>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                {/* Removed duplicate newsletter section for clarity */}
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="copyright">
                            <div className="row">
                                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                    ©{" "}
                                    <a className="border-bottom" href="#">
                                        Your Site Name
                                    </a>
                                    , All Right Reserved.
                                    {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                                    Designed By{" "}
                                    <a className="border-bottom" href="https://htmlcodex.com">
                                        HTML Codex
                                    </a>
                                    <br />
                                    Distributed By:{" "}
                                    <a
                                        className="border-bottom"
                                        href="https://themewagon.com"
                                        target="_blank"
                                    >
                                        ThemeWagon
                                    </a>
                                </div>
                                <div className="col-md-6 text-center text-md-end">
                                    <div className="footer-menu">
                                        <a href="">Home</a>
                                        <a href="">Cookies</a>
                                        <a href="">Help</a>
                                        <a href="">FQAs</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer End */}
            </>



        </div>
    );
}

export default Index;