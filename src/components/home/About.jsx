const About = () => {
  return (
    <section className="about">
      {/* 🔹 BACKGROUND LOGO */}
      <div className="about-bg-logo" />

      {/* 🔹 CONTENT OVERLAY */}
      <div className="about-content-wrapper">
        {/* Centered Heading */}
        <h2 className="about-heading fade-in">About Spa Wellness</h2>

        <div className="about-container">
          {/* Image */}
          <div className="about-image slide-left">
            <img
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6"
              alt="Spa relaxation"
            />
          </div>

          {/* Content */}
          <div className="about-content slide-right">
            <p className="about-text">
              Spa Wellness is a peaceful sanctuary designed to restore balance,
              relax the body, and calm the mind.
            </p>

            <p className="about-text">
              Our expert therapists combine natural healing techniques with
              modern wellness practices to deliver deeply rejuvenating
              experiences.
            </p>

            <p className="about-text">
              Every treatment is personalized, luxurious, and crafted to help
              you reconnect with yourself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
