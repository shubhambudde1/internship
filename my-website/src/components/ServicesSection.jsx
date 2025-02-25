import React from 'react';

const ServicesSection = () => (
  <section className="services" id="services">
    <h2>Our Services</h2>
    <div className="service-cards">
      <div className="card">
        <div className="icon">Icon 1</div>
        <h3>Service 1</h3>
        <p>Description of Service 1.</p>
        <button>Learn More</button>
      </div>
      <div className="card">
        <div className="icon">Icon 2</div>
        <h3>Service 2</h3>
        <p>Description of Service 2.</p>
        <button>Learn More</button>
      </div>
      <div className="card">
        <div className="icon">Icon 3</div>
        <h3>Service 3</h3>
        <p>Description of Service 3.</p>
        <button>Learn More</button>
      </div>
    </div>
  </section>
);

export default ServicesSection;
