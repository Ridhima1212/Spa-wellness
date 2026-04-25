import { useState } from "react";

const AddTestimonial = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !feedback) return;

    onAdd({ name, feedback });
    setName("");
    setFeedback("");
  };

  return (
    <form className="testimonial-form" onSubmit={handleSubmit}>
      <h3>Add Your Experience</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Your Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <button type="submit">Submit Testimonial</button>
    </form>
  );
};

export default AddTestimonial;
