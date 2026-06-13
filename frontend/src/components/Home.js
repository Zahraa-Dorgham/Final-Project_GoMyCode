import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const words = ['discipline', 'wellbeing', 'healthy'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="home-container">
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
                          className={`animated-word ${index === currentWordIndex ? 'is-visible' : 'is-hidden'
                            }`}
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
    </div>
  );
}

export default Home;