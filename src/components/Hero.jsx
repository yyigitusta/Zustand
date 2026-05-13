import React from 'react'
import { FiArrowDown } from 'react-icons/fi'

function Hero() {
  const handleScroll = () => {
    const urunlerSection = document.getElementById('urunler-section')
    if (urunlerSection) {
      urunlerSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-section" id="hero">
      {/* Animated Background */}
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1" />
        <div className="hero__gradient-orb hero__gradient-orb--2" />
        <div className="hero__gradient-orb hero__gradient-orb--3" />
      </div>

      <div className="hero__content">

        <h1 className="hero__title">
          Premium Alışveriş
          <span className="hero__title-gradient"> Deneyimi</span>
        </h1>

        <button className="hero__cta" onClick={handleScroll} id="explore-products">
          Ürünleri Keşfet
          <FiArrowDown size={18} />
        </button>
      </div>

      {/* Floating Cards */}
      <div className="hero__floating-cards">
        <div className="hero__float-card hero__float-card--1">
          <small>Akıllı Sepet</small>
        </div>
        <div className="hero__float-card hero__float-card--2">
          <small>Favoriler</small>
        </div>
        <div className="hero__float-card hero__float-card--3">
          <small>Persist</small>
        </div>
      </div>
    </section>
  )
}

export default Hero
