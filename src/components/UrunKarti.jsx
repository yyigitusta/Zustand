import React from 'react'
import { useSepetStore } from '../store/useSepetStore'

function UrunKarti() {
  const sepeteEkle = useSepetStore((state) => state.sepeteEkle)

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      width: '200px', 
      borderRadius: '8px',
      textAlign: 'center',
      marginTop: '20px'
    }}>
      <h3>Siyah Tişört</h3>
      <p style={{ color: 'green', fontSize: '18px' }}>200 TL</p>
      
      <button 
        onClick={sepeteEkle} 
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Sepete Ekle
      </button>
    </div>
  )
}

export default UrunKarti