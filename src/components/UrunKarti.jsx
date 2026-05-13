import React, { useState } from 'react'
import { FiHeart, FiShoppingBag, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useSepetStore } from '../store/useSepetStore'
import { urunler } from '../data/urunler'

function UrunKarti({ urun }) {
  // Zustand selectors — her biri sadece ihtiyaç duyduğu state'i çeker
  const sepeteEkle = useSepetStore((state) => state.sepeteEkle)
  const favoriToggle = useSepetStore((state) => state.favoriToggle)
  const favoriler = useSepetStore((state) => state.favoriler)
  const sepet = useSepetStore((state) => state.sepet)

  const [eklendi, setEklendi] = useState(false)

  const favoriMi = favoriler.includes(urun.id)
  const sepetItem = sepet.find((item) => item.id === urun.id)

  const handleSepeteEkle = () => {
    sepeteEkle(urun.id)
    setEklendi(true)
    setTimeout(() => setEklendi(false), 1200)

    toast.success(`${urun.isim} sepete eklendi!`, {
      style: {
        background: 'rgba(20, 20, 30, 0.95)',
        color: '#f0f0f0',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        backdropFilter: 'blur(10px)',
      },
    })
  }

  const handleFavoriToggle = () => {
    favoriToggle(urun.id)
    if (!favoriMi) {
      toast.success(`${urun.isim} favorilere eklendi!`, {
        style: {
          background: 'rgba(20, 20, 30, 0.95)',
          color: '#f0f0f0',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          backdropFilter: 'blur(10px)',
        },
      })
    }
  }

  // Badge renk sınıfları
  const badgeClass = {
    'Yeni': 'badge--yeni',
    'İndirim': 'badge--indirim',
    'Çok Satan': 'badge--coksatan',
    'Limitli': 'badge--limitli',
  }

  return (
    <div className="urun-karti" id={`product-${urun.id}`}>
      {/* Ürün Resmi */}
      <div className="urun-karti__resim-container">
        <img
          src={urun.resim}
          alt={urun.isim}
          className="urun-karti__resim"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="urun-karti__overlay">
          <button
            className={`urun-karti__favori-btn ${favoriMi ? 'urun-karti__favori-btn--aktif' : ''}`}
            onClick={handleFavoriToggle}
            aria-label={favoriMi ? 'Favorilerden çıkar' : 'Favorilere ekle'}
            id={`fav-btn-${urun.id}`}
          >
            <FiHeart size={20} fill={favoriMi ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Badge */}
        {urun.badge && (
          <span className={`urun-karti__badge ${badgeClass[urun.badge] || ''}`}>
            {urun.badge}
          </span>
        )}
      </div>

      {/* Ürün Bilgileri */}
      <div className="urun-karti__bilgi">
        <span className="urun-karti__kategori">{urun.kategori}</span>
        <h3 className="urun-karti__isim">{urun.isim}</h3>
        <p className="urun-karti__aciklama">{urun.aciklama}</p>

        <div className="urun-karti__alt">
          <span className="urun-karti__fiyat">
            {urun.fiyat.toLocaleString('tr-TR')} ₺
          </span>
          <button
            className={`urun-karti__sepet-btn ${eklendi ? 'urun-karti__sepet-btn--eklendi' : ''}`}
            onClick={handleSepeteEkle}
            id={`add-to-cart-${urun.id}`}
          >
            {eklendi ? (
              <>
                <FiCheck size={16} /> Eklendi
              </>
            ) : (
              <>
                <FiShoppingBag size={16} />
                {sepetItem ? `Ekle (${sepetItem.adet})` : 'Sepete Ekle'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UrunKarti