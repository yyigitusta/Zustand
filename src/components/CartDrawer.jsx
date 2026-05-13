import React, { useEffect } from 'react'
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { useSepetStore } from '../store/useSepetStore'
import { urunler } from '../data/urunler'

function CartDrawer() {
  // Zustand selectors
  const sepet = useSepetStore((state) => state.sepet)
  const drawerAcik = useSepetStore((state) => state.drawerAcik)
  const drawerKapat = useSepetStore((state) => state.drawerKapat)
  const sepettenCikar = useSepetStore((state) => state.sepettenCikar)
  const adetGuncelle = useSepetStore((state) => state.adetGuncelle)
  const sepetiBosalt = useSepetStore((state) => state.sepetiBosalt)
  const toplamFiyatHesapla = useSepetStore((state) => state.toplamFiyatHesapla)

  // Body scroll'u engelle drawer açıkken
  useEffect(() => {
    if (drawerAcik) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerAcik])

  // Sepetteki ürünlerin detaylı bilgisi
  const sepetUrunleri = sepet.map((item) => {
    const urun = urunler.find((u) => u.id === item.id)
    return { ...item, ...urun }
  }).filter(item => item.isim) // Geçersiz ürünleri filtrele

  const toplamFiyat = toplamFiyatHesapla(urunler)

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`drawer-overlay ${drawerAcik ? 'drawer-overlay--aktif' : ''}`}
        onClick={drawerKapat}
        id="drawer-overlay"
      />

      {/* Drawer Panel */}
      <aside
        className={`drawer ${drawerAcik ? 'drawer--aktif' : ''}`}
        id="cart-drawer"
        aria-label="Sepet"
      >
        {/* Drawer Header */}
        <div className="drawer__header">
          <h2 className="drawer__title">
            <FiShoppingBag size={22} />
            Sepetim
            {sepet.length > 0 && (
              <span className="drawer__count">{sepet.length} ürün</span>
            )}
          </h2>
          <button
            className="drawer__close-btn"
            onClick={drawerKapat}
            id="close-drawer"
            aria-label="Sepeti kapat"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer__body">
          {sepetUrunleri.length === 0 ? (
            <div className="drawer__bos">
              <h3>Sepetiniz boş</h3>
              <p>Harika ürünler sizi bekliyor!</p>
              <button className="drawer__alisveris-btn" onClick={drawerKapat}>
                Alışverişe Başla
              </button>
            </div>
          ) : (
            <div className="drawer__items">
              {sepetUrunleri.map((item) => (
                <div className="drawer__item" key={item.id} id={`cart-item-${item.id}`}>
                  <img
                    src={item.resim}
                    alt={item.isim}
                    className="drawer__item-img"
                  />
                  <div className="drawer__item-bilgi">
                    <h4 className="drawer__item-isim">{item.isim}</h4>
                    <span className="drawer__item-fiyat">
                      {item.fiyat.toLocaleString('tr-TR')} ₺
                    </span>

                    <div className="drawer__item-kontroller">
                      <div className="drawer__adet-kontrol">
                        <button
                          className="drawer__adet-btn"
                          onClick={() => adetGuncelle(item.id, item.adet - 1)}
                          aria-label="Adeti azalt"
                          id={`decrease-${item.id}`}
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="drawer__adet">{item.adet}</span>
                        <button
                          className="drawer__adet-btn"
                          onClick={() => adetGuncelle(item.id, item.adet + 1)}
                          aria-label="Adeti artır"
                          id={`increase-${item.id}`}
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <button
                        className="drawer__sil-btn"
                        onClick={() => sepettenCikar(item.id)}
                        aria-label="Ürünü sil"
                        id={`remove-${item.id}`}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {sepetUrunleri.length > 0 && (
          <div className="drawer__footer">
            <div className="drawer__toplam">
              <span>Toplam</span>
              <span className="drawer__toplam-fiyat">
                {toplamFiyat.toLocaleString('tr-TR')} ₺
              </span>
            </div>
            <button className="drawer__satin-al-btn" id="checkout-button">
              Satın Al
            </button>
            <button
              className="drawer__bosalt-btn"
              onClick={sepetiBosalt}
              id="clear-cart-button"
            >
              Sepeti Boşalt
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export default CartDrawer
