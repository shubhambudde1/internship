import React from 'react';

const ContactSection = () => (
  <section className="contact" id="contact">
    <h2>Get in Touch</h2>
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <textarea placeholder="Message"></textarea>
      <button type="submit">Send Message</button>
    </form>
  </section>
);

export default ContactSection;
