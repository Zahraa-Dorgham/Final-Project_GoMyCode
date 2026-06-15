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
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

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

                <Link to="/shop" className="hero-btn">Checkout Classes</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      <section className="classes-section">
        <div className="container-fluid">
          <div className="classes-grid">
            {classes && classes.length > 0 ? (
              classes.slice(0, 4).map((classe) => (
                <Link to="/classes" key={classe._id} className="class-card-link">
                  <div className="class-card">
                    <div className="class-card-image" style={{ backgroundImage: `url(${classe.img || 'https://via.placeholder.com/500'})` }}>
                      <div className="class-card-overlay"></div>
                    </div>
                    <div className="class-card-title">{classe.name}</div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center py-5">Chargement des classes...</p>
            )}
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