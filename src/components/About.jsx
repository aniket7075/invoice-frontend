import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/about.css";

const About = () => {
  /* ===== DEMO SLIDES ===== */
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      text: "Celebrating years of innovation, teamwork, and growth."
    },
    {
      img: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c",
      text: "A culture built on creativity, precision, and passion."
    },
    {
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
      text: "Building scalable digital platforms for the future."
    }
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const [openAccordion, setOpenAccordion] = useState(null);
  const [whatsOpen, setWhatsOpen] = useState(false);

  return (
    <div className="about-page">
      <Navbar />

      {/* HERO / SLIDER SECTION */}
      <section className="about-section page-content">
        <div className="left-image-container">
          <img src={slides[slideIndex].img} alt="Team" />
          <div className="carousel-dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={i === slideIndex ? "dot active" : "dot"}
                onClick={() => setSlideIndex(i)}
              ></span>
            ))}
          </div>
        </div>

        <div className="right-content">
          <h2>
            About <span>DW</span> Innovation
          </h2>
          <div className="underline"></div>
          <p>{slides[slideIndex].text}</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="our-story-section">
        <h2 className="title">Our Story</h2>
        <p>
          <b>DW INNOVATION PVT. LTD.</b><br></br> was founded by a team of forward-thinking 
            entrepreneurs who recognized the need for reliable, high-impact development services. Driven by a culture of creativity, precision, and passion, we transform
             ideas into exceptional digital experiences.
        </p>
        <p>
          Today, we are a trusted global tech partner—delivering top-tier web and mobile development, custom product solutions, and scalable digital platforms. Our commitment to quality and client success has made us a standout name in the technology space.
        </p>
      </section>

      {/* EMPOWERING */}
      <section className="empower-section">
        <h2>Empowering Through Action</h2>
        <p>
          We believe progress is meaningful only when it benefits everyone.
          That’s why we support people, sustainability, and communities.
        </p>
      </section>

      {/* ACCORDION */}
      <section className="accordion-wrapper">
        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() =>
              setOpenAccordion(openAccordion === 1 ? null : 1)
            }
          >
            Who We Are <span>{openAccordion === 1 ? "-" : "+"}</span>
          </button>

          {openAccordion === 1 && (
            <div className="accordion-content">
              <div className="timeline">
                {[
                  ["2021", "Foundation", "It all started with a vision and a small passionate team."],
                  ["2022", "Growth & Expansion", "Expanded services and built international partnerships."],
                  ["2023", "Innovation Hub", "Launched innovation labs for emerging technologies."],
                  ["2024", "Industry Recognition", "Strategic partnerships with leading providers."],
                  ["2025", "Global Impact", "100+ experts across three continents."]
                ].map((item, i) => (
                  <div key={i} className="timeline-item">
                    <div className="circle">{item[0]}</div>
                    <div className="content">
                      <h3>{item[1]}</h3>
                      <p>{item[2]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="accordion-item">
          <button
            className="accordion-header"
            onClick={() =>
              setOpenAccordion(openAccordion === 2 ? null : 2)
            }
          >
            Mission & Vision <span>{openAccordion === 2 ? "-" : "+"}</span>
          </button>

          {openAccordion === 2 && (
            <div className="accordion-content">
              <p>
                <b>Our Mission:</b> Deliver innovative digital solutions that
                empower businesses to achieve their goals.
              </p>
              <p>
                <b>Our Vision:</b> Bringing ideas into reality through technology.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <h2>
          "Experience. Excellence. Every Time."
          <br />
          <span>Quality digital solutions. Client satisfaction.</span>
        </h2>

        <div className="stats-cards">
          <div className="card"><h3>352+</h3><p>Projects Completed</p></div>
          <div className="card"><h3>100%</h3><p>Client Satisfaction</p></div>
          <div className="card"><h3>5+</h3><p>Years Experience</p></div>
          <div className="card"><h3>215+</h3><p>Customer Served</p></div>
        </div>
      </section>

      {/* WHATSAPP FLOAT */}
      <div className="whatsapp-float">
        <div className="whatsapp-btn" onClick={() => setWhatsOpen(!whatsOpen)}>
          💬
        </div>
        {whatsOpen && (
          <div className="whatsapp-options">
            <a href="https://wa.me/919284117439" target="_blank">HR</a>
            <a href="https://wa.me/919595505063" target="_blank">Marketing</a>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="about-footer">
        <p>© 2025 DW Innovation Pvt. Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
