import { useState } from "react";
import AddTestimonial from "../AddTestimonial";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const addTestimonial = (testimonial) => {
    setTestimonials([testimonial, ...testimonials]);
  };

  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>

      <AddTestimonial onAdd={addTestimonial} />

      {testimonials.length === 0 && (
        <p>No testimonials yet. Be the first!</p>
      )}

      <div className="testimonials-container">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <p>“{item.feedback}”</p>
            <h4>— {item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
