import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import UrunKarti from './components/UrunKarti'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Favoriler from './pages/Favoriler'
import { urunler } from './data/urunler'
import { useSepetStore } from './store/useSepetStore'
import './App.css'

function AnaSayfa() {
  return (
    <>
      <Hero />
      <section className="urunler-section" id="urunler-section">
        <div className="urunler-section__header">
          <h2 className="urunler-section__title">Öne Çıkan Ürünler</h2>
          <p className="urunler-section__desc">
            Zustand state management ile yönetilen ürün koleksiyonu
          </p>
        </div>
        <div className="urunler-grid" id="products-grid">
          {urunler.map((urun) => (
            <UrunKarti key={urun.id} urun={urun} />
          ))}
        </div>
      </section>
    </>
  )
}

function App() {
  // Zustand'dan temayı çekiyoruz (dark veya light)
  const tema = useSepetStore((state) => state.tema)

  // Temayı tüm siteye uygulamak için body class'ını güncelliyoruz
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
  }, [tema])

  return (
    <BrowserRouter>
      <div className="app" id="app-root">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AnaSayfa />} />
            <Route path="/favoriler" element={<Favoriler />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2000,
          }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App