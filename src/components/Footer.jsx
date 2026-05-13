import React from 'react'
import { FiGithub, FiHeart } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__logo">ZustandShop</span>
          <p className="footer__desc">
            Bu proje, <strong>Zustand</strong> state management kütüphanesinin
            gerçek bir e-ticaret senaryosunda nasıl kullanıldığını göstermek için oluşturulmuştur.
          </p>
        </div>



        <div className="footer__links">
          <h4>Özellikler</h4>
          <span>Persist Middleware</span>
          <span>Selector Pattern</span>
          <span>Derived State</span>
        </div>
      </div>


    </footer>
  )
}

export default Footer
