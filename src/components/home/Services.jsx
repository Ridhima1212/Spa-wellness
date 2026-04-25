import { Link } from "react-router-dom";
import { useState } from "react";
import BookingModal from "../booking/BookingModal";

const services = [
  {
    title: "Swedish Massage",
    description:
      "A gentle full-body massage designed to relax muscles and improve circulation.",
    duration: "60 min",
    price: "₹1999",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3dlZGlzaCUyME1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Aroma Therapy",
    description:
      "Therapeutic massage using essential oils to relieve stress and calm the mind.",
    duration: "45 min",
    price: "₹1799",
    image: "https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXJvbWElMjBUaGVyYXB5fGVufDB8fDB8fHww",
  },
  {
    title: "Deep Tissue Massage",
    description:
      "Targets deep muscle layers to relieve chronic tension and pain. Helps you relax.",
    duration: "75 min",
    price: "₹2499",
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVlcCUyMFRpc3N1ZSUyME1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
  },
];

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openBookingModal = (serviceName) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <section className="services">
      <h2>Our Signature Massages</h2>

      <div className="service-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} />

            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <div className="service-meta">
                <span>⏱ {service.duration}</span>
                <span>💰 {service.price}</span>
              </div>

              {/* ✅ UPDATED BUTTON */}
              <button
                className="service-btn"
                onClick={() => openBookingModal(service.title)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="explore-services">
        <Link to="/services" className="explore-btn">
          Explore All Services
        </Link>
      </div>

      {/* ✅ MODAL */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
};

export default Services;
