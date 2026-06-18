import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../redux/classeSlice';
import fitnessImage from '../assets/fitness-homepage.png';
import './Home.css';

function Home() {
  const words = ['discipline', 'wellbeing', 'healthy'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classe);

  useEffect(() => {
    dispatch(getClasses());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);
  // gestion avis  ---
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Nour Hamdi",
      role: "TRAINER",
      quote: "A good coach makes sure that they have the right incentive before taking on a client. Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Oussema jlassi",
      role: "COACH",
      quote: "Form follows function, but in fitness, consistency beats everything. The platform provides all the necessary tools to track development and maintain top performance.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    }
  ];

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="home-container">
      {/* 1. SECTION HERO */}
      <section className="hero-section">
        <div className="container-fluid hero-content-wrapper h-100">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6 hero-text-col">
              <div className="hero-content">
                <div className="hero-typography-block">
                  <span className="hero-text-line">The Price</span>
                  <span className="hero-text-line">
                    of <span className="text-italic">Excellence</span>
                  </span>

                  <div className="animated-headline">
                    <span className="static-text">is </span>
                    <span className="words-wrapper">
                      {words.map((word, index) => (
                        <b
                          key={word}
                          className={`animated-word ${index === currentWordIndex ? 'is-visible' : 'is-hidden'}`}
                        >
                          {word}
                        </b>
                      ))}
                    </span>
                  </div>
                </div>

                <Link to="/classes" className="hero-btn">Checkout Classes</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="classes-section">
        <div className="container-fluid">
          <div className="classes-grid">
            {classes && classes.length > 0  &&
              classes.slice(0, 4).map((classe) => (
                <Link to="/classes" key={classe._id} className="class-card-link">
                  <div className="class-card">
                    <div className="class-card-image" style={{ backgroundImage: `url(${classe.img })` }}>
                      <div className="class-card-overlay"></div>
                    </div>
                    <div className="class-card-title">{classe.name}</div>
                  </div>
                </Link>
              ))
          }
          </div>
        </div>
      </section>

      <section className="features-info-section container">
        <div className="row align-items-center">
          <div className="col-lg-6 features-text-block">
            <span className="welcome-tag">Welcome To FIT CLUB</span>
            <h2>Powered by fitness & inspired by helping others</h2>

            <div className="features-grid-row">
              {/*Personal Training */}
              <div className="feature-item">
                <div className="feature-icon-wrapper gym-glow">
                  <img src="https://themes-themegoods.b-cdn.net/vive/wp-content/uploads/2021/09/gym-icon.png" alt="Personal Training" />
                </div>
                <div className="feature-item-content">
                  <h3>Personal Training</h3>
                  <p>Work one-on-one with certified trainers to build strength, improve performance, and maintain a healthy lifestyle.</p>
                  <Link to="/classes" className="discover-link">Discover More</Link>
                </div>
              </div>

              {/* Physical Therapy */}
              <div className="feature-item">
                <div className="feature-icon-wrapper stethoscope-glow">
                  <img src="https://themes-themegoods.b-cdn.net/vive/wp-content/uploads/2021/09/noun_Stethoscope_3919033.png" alt="Physical Therapy" />
                </div>
                <div className="feature-item-content">
                  <h3>Physical Therapy</h3>
                  <p>Recover stronger and train smarter with professional therapy services that help improve mobility and flexibility.</p>
                  <Link to="/classes" className="discover-link">Discover More</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 text-center features-image-block">
            <img
              src={fitnessImage}
              alt="Fitness training"
              className="side-fitness-img"
            />
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-card">
          <h2 className="testimonial-title">Our Customers</h2>

          <p className="testimonial-text">
            {testimonials[currentReviewIndex].quote}
          </p>

          <div className="testimonial-footer">
            <div className="client-profile">
              <img
                src={testimonials[currentReviewIndex].avatar}
                alt={testimonials[currentReviewIndex].name}
                className="client-avatar"
              />
              <div className="client-info">
                <h4>{testimonials[currentReviewIndex].name}</h4>
                <span>{testimonials[currentReviewIndex].role}</span>
              </div>
            </div>

            <div className="navigation-arrows">
              <button className="arrow-btn" onClick={handlePrevReview} aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button className="arrow-btn" onClick={handleNextReview} aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo */}
      <section className="brands-showcase-section">
        <div className="container">
          <div className="brands-grid">
            <div className="brand-logo-item">
              <img src="https://radiustheme.com/demo/wordpress/themes/gymat/wp-content/uploads/2022/04/brand-1.png" alt="Power Lifting Brand" />
            </div>
            <div className="brand-logo-item">
              <img src="https://radiustheme.com/demo/wordpress/themes/gymat/wp-content/uploads/2022/04/brand-2.png" alt="The Fitness Club Brand" />
            </div>
            <div className="brand-logo-item">
              <img src="https://radiustheme.com/demo/wordpress/themes/gymat/wp-content/uploads/2022/04/brand-3.png" alt="Athletic Club Brand" />
            </div>
            <div className="brand-logo-item">
              <img src="https://radiustheme.com/demo/wordpress/themes/gymat/wp-content/uploads/2022/04/brand-4.png" alt="Gym Club Brand" />
            </div>
            <div className="brand-logo-item">
              <img src="https://radiustheme.com/demo/wordpress/themes/gymat/wp-content/uploads/2022/04/brand-5.png" alt="Muscle Brand" />
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
}

export default Home;