import React from 'react'
import Navbar from './components/Navbar'
import UrunKarti from './components/UrunKarti'

function App() {
  return (
    <div>
      {/* En üstte Navbar duruyor */}
      <Navbar />
      
      {/* Alt tarafta da ürünler */}
      <div style={{ padding: '20px' }}>
        <UrunKarti />
        {/* İstersen buraya aynısından 3-5 tane daha ekleyebilirsin */}
      </div>
    </div>
  )
}

export default App