import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import { useSepetStore } from '../store/useSepetStore'
import { urunler } from '../data/urunler'
import UrunKarti from '../components/UrunKarti'

function Favoriler() {
  // Zustand selector — sadece favoriler array'ini al
  const favoriler = useSepetStore((state) => state.favoriler)

  // Favori ürünlerin detaylı listesi
  const favoriUrunler = urunler.filter((urun) => favoriler.includes(urun.id))

  return (
    <div className="favoriler-sayfa" id="favorites-page">
      <div className="favoriler__header">
        <Link to="/" className="favoriler__geri-btn" id="back-to-home">
          <FiArrowLeft size={20} />
          Geri
        </Link>
        <h1 className="favoriler__title">
          <FiHeart size={28} />
          Favorilerim
        </h1>
        <p className="favoriler__sayi">
          {favoriUrunler.length} ürün
        </p>
      </div>

      {favoriUrunler.length === 0 ? (
        <div className="favoriler__bos">
          <h2>Henüz favori ürününüz yok</h2>
          <p>Beğendiğiniz ürünlerin kalp ikonuna tıklayarak favorilerinize ekleyin.</p>
          <Link to="/" className="favoriler__alisveris-btn" id="browse-products">
            <FiShoppingBag size={18} />
            Ürünlere Göz At
          </Link>
        </div>
      ) : (
        <div className="urunler-grid" id="favorites-grid">
          {favoriUrunler.map((urun) => (
            <UrunKarti key={urun.id} urun={urun} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoriler
