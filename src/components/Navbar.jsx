import React from 'react'
import { useSepetStore } from '../store/useSepetStore'

function Navbar() {
  const sepetSayisi = useSepetStore((state) => state.sepetSayisi)
  const sepetiBosalt = useSepetStore((state) => state.sepetiBosalt)

  return (
    <div style={{ 
      background: '#282c34', 
      color: 'white', 
      padding: '15px', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2>Dükkan</h2>
      <div>
        <span style={{ fontSize: '20px', marginRight: '15px' }}>
          🛒 Sepetim ({sepetSayisi})
        </span>
        <button onClick={sepetiBosalt} style={{ padding: '5px' }}>
          Sepeti Boşalt
        </button>
      </div>
    </div>
  )
}

export default Navbar