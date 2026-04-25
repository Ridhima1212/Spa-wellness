import "../../styles/main.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Relax. Rejuvenate. Renew.</h1>
        <p>Experience luxury spa treatments designed for your peace.</p>
        <button
          className="cta-btn"
          onClick={() => {
            document.getElementById("booking")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Book Appointment
        </button>
      </div>
    </section>
  );
};

export default Hero;
