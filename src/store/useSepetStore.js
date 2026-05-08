import { create } from 'zustand'

export const useSepetStore = create((set) => ({
  sepetSayisi: 0, 

  // Sepete 1 ekler
  sepeteEkle: () => set((state) => ({ sepetSayisi: state.sepetSayisi + 1 })),
  
  // Sepeti sıfırlar
  sepetiBosalt: () => set({ sepetSayisi: 0 })
}))