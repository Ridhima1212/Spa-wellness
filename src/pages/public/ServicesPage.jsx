import { useState } from "react";
import { Link } from "react-router-dom";
import BookingModal from "../../components/booking/BookingModal";

const services = [
  {
    title: "Swedish Massage",
    description:
      "A relaxing full-body massage that improves circulation and relieves muscle tension.",
    duration: "60 min",
    price: "₹1999",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3dlZGlzaCUyME1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Aroma Therapy",
    description:
      "Essential oils combined with massage techniques to calm the mind and body.",
    duration: "45 min",
    price: "₹1799",
    image:
      "https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXJvbWElMjBUaGVyYXB5fGVufDB8fDB8fHww",
  },
  {
    title: "Deep Tissue Massage",
    description:
      "Focused massage targeting deep muscle layers to relieve chronic pain.",
    duration: "75 min",
    price: "₹2499",
    image:
      "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVlcCUyMFRpc3N1ZSUyME1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Hot Stone Massage",
    description:
      "Heated stones applied to key points to relax muscles and improve blood flow.",
    duration: "60 min",
    price: "₹2299",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SG90JTIwU3RvbmUlMjBNYXNzYWdlfGVufDB8fDB8fHww",
  },
  {
    title: "Balinese Massage",
    description:
      "A traditional massage combining deep tissue, stretching, and aromatherapy.",
    duration: "75 min",
    price: "₹2599",
    image:
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFsaW5lc2UlMjBNYXNzYWdlfGVufDB8fDB8fHww",
  },
  {
    title: "Reflexology",
    description:
      "Pressure-based foot therapy targeting reflex points to restore balance.",
    duration: "45 min",
    price: "₹1499",
    image: "https://images.pexels.com/photos/5240641/pexels-photo-5240641.jpeg",
  },
  {
    title: "Thai Massage",
    description:
      "A dynamic therapy combining assisted stretches and deep pressure techniques.",
    duration: "90 min",
    price: "₹2799",
    image:
      "https://images.unsplash.com/photo-1611073615848-d6ff6215931f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGhhaSUyME1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Head & Shoulder Massage",
    description:
      "Relieves stress, headaches, and neck tension for instant relaxation.",
    duration: "30 min",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1740035680800-d5270855c68d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEhlYWQlMjBhbmQlMjBTaG91bGRlciUyME1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Couple Massage",
    description:
      "A relaxing massage experience designed for two in a private setting.",
    duration: "60 min",
    price: "₹3999",
    image:
      "https://images.pexels.com/photos/19695952/pexels-photo-19695952.jpeg",
  },
  {
    title: "Body Scrub & Polish",
    description:
      "Exfoliating treatment that rejuvenates skin and enhances natural glow.",
    duration: "45 min",
    price: "₹1899",
    image: "https://images.pexels.com/photos/6634657/pexels-photo-6634657.jpeg",
  },
  {
    title: "Prenatal Massage",
    description:
      "A gentle and soothing massage specially designed for expecting mothers to reduce stress and muscle discomfort.",
    duration: "60 min",
    price: "₹2199",
    image:
      "https://images.unsplash.com/photo-1650044252595-cacd425982ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJlbmF0YWwlMjBtYXNzYWdlfGVufDB8fDB8fHww",
  },
  {
    title: "Ayurvedic Abhyanga",
    description:
      "A traditional Ayurvedic oil massage that detoxifies the body and restores energy balance.",
    duration: "75 min",
    price: "₹2699",
    image:
      "https://images.unsplash.com/photo-1521146250551-a5578dcc2e64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXl1cnZlZGljfGVufDB8fDB8fHww",
  },
];

const ServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section className="services-page">
      {/* 🔹 BACKGROUND LOGO */}
      <div className="services-bg-logo" />

      {/* 🔹 CONTENT OVERLAY */}
      <div className="services-page-content-wrapper">
        {/* CTA */}
        <div className="services-cta">
          <h2>Ready to Relax?</h2>
          <p>Book your session today and experience true wellness.</p>
        </div>

        {/* PAGE HEADER */}
        <div className="services-hero">
          <h1>Our Services</h1>
          <p>
            Experience a curated range of therapies designed to relax, heal, and
            rejuvenate.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="services-page-grid">
          {services.map((service, index) => (
            <div className="services-page-card" key={index}>
              <img src={service.image} alt={service.title} />

              <div className="services-page-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <div className="services-page-meta">
                  <span>⏱ {service.duration}</span>
                  <span>💰 {service.price}</span>
                </div>

                <button
                  className="service-btn"
                  onClick={() => openModal(service.title)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
        />

        <div className="back-home-container">
          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
