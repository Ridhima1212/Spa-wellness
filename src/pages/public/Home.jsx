import Hero from "../../components/home/Hero";
import Services from "../../components/home/Services";
import About from "../../components/home/About";
import BookingSection from "../../components/home/BookingToggle";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const Home = () => {
  useScrollAnimation();

  return (
    <>
      <Hero />

      <div className="fade-in">
        <Services />
      </div>

      <section id="about">
        <About />
      </section>

      {/* ✅ NEW CLEAN SECTION */}
      <section id="contact">
        <BookingSection />
      </section>
    </>
  );
};

export default Home;