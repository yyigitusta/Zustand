import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShoppingBag, FiHeart, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useSepetStore } from '../store/useSepetStore'

function Navbar() {
  // Sepet state'ini dinleyerek component'in yenilenmesini sağlıyoruz
  const sepet = useSepetStore((state) => state.sepet)
  const toplamUrunSayisi = sepet.reduce((toplam, item) => toplam + item.adet, 0)
  
  const drawerAc = useSepetStore((state) => state.drawerAc)
  const favoriler = useSepetStore((state) => state.favoriler)
  
  // Tema state'leri Zustand'dan geliyor
  const tema = useSepetStore((state) => state.tema)
  const temaDegistir = useSepetStore((state) => state.temaDegistir)

  const [scrolled, setScrolled] = useState(false)
  const [menuAcik, setMenuAcik] = useState(false)
  const location = useLocation()

  // Navbar scroll efekti
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="logo-link">
          <span className="navbar__logo-text">ZustandShop</span>
        </Link>

        {/* Navigasyon Linkleri - Desktop */}
        <div className={`navbar__links ${menuAcik ? 'navbar__links--open' : ''}`}>
          <Link
            to="/"
            className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
            onClick={() => setMenuAcik(false)}
            id="nav-home"
          >
            Ana Sayfa
          </Link>
          <Link
            to="/favoriler"
            className={`navbar__link ${location.pathname === '/favoriler' ? 'navbar__link--active' : ''}`}
            onClick={() => setMenuAcik(false)}
            id="nav-favorites"
          >
            <FiHeart size={16} />
            Favoriler
            {favoriler.length > 0 && (
              <span className="navbar__badge navbar__badge--fav">{favoriler.length}</span>
            )}
          </Link>
        </div>

        {/* Sağ taraf: Sepet + Mobil Menü */}
        <div className="navbar__actions">
          {/* Zustand üzerinden tema değiştirme butonu */}
          <button
            className="navbar__theme-btn"
            onClick={temaDegistir}
            aria-label="Temayı Değiştir"
            title="Temayı Değiştir"
          >
            {tema === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          <button
            className="navbar__cart-btn"
            onClick={drawerAc}
            id="cart-button"
            aria-label="Sepeti aç"
          >
            <FiShoppingBag size={22} />
            {toplamUrunSayisi > 0 && (
              <span className="navbar__badge navbar__badge--cart" key={toplamUrunSayisi}>
                {toplamUrunSayisi}
              </span>
            )}
          </button>

          {/* Hamburger Menü - Mobil */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuAcik(!menuAcik)}
            id="hamburger-button"
            aria-label="Menüyü aç/kapat"
          >
            {menuAcik ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobil menü overlay */}
      {menuAcik && <div className="navbar__overlay" onClick={() => setMenuAcik(false)} />}
    </nav>
  )
}

export default Navbar