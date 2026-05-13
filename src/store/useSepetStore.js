import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSepetStore = create(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────
      sepet: [],        // [{ id, adet }]
      favoriler: [],    // [id, id, ...]
      drawerAcik: false,
      tema: 'light',    // Tema durumu (light / dark)

      // ── Sepet Actions ─────────────────────────────────────
      sepeteEkle: (urunId) =>
        set((state) => {
          const mevcut = state.sepet.find((item) => item.id === urunId)
          if (mevcut) {
            return {
              sepet: state.sepet.map((item) =>
                item.id === urunId ? { ...item, adet: item.adet + 1 } : item
              ),
            }
          }
          return { sepet: [...state.sepet, { id: urunId, adet: 1 }] }
        }),

      sepettenCikar: (urunId) =>
        set((state) => ({
          sepet: state.sepet.filter((item) => item.id !== urunId),
        })),

      adetGuncelle: (urunId, yeniAdet) =>
        set((state) => {
          if (yeniAdet <= 0) {
            return { sepet: state.sepet.filter((item) => item.id !== urunId) }
          }
          return {
            sepet: state.sepet.map((item) =>
              item.id === urunId ? { ...item, adet: yeniAdet } : item
            ),
          }
        }),

      sepetiBosalt: () => set({ sepet: [] }),

      // ── Favori Actions ────────────────────────────────────
      favoriToggle: (urunId) =>
        set((state) => {
          const zatenFavori = state.favoriler.includes(urunId)
          return {
            favoriler: zatenFavori
              ? state.favoriler.filter((id) => id !== urunId)
              : [...state.favoriler, urunId],
          }
        }),

      // ── Drawer Actions ────────────────────────────────────
      drawerAc: () => set({ drawerAcik: true }),
      drawerKapat: () => set({ drawerAcik: false }),

      // ── Tema Actions ──────────────────────────────────────
      temaDegistir: () => set((state) => ({ tema: state.tema === 'light' ? 'dark' : 'light' })),

      // ── Computed / Derived Helpers ────────────────────────
      toplamUrunSayisi: () => {
        const { sepet } = get()
        return sepet.reduce((toplam, item) => toplam + item.adet, 0)
      },

      toplamFiyatHesapla: (urunlerListesi) => {
        const { sepet } = get()
        return sepet.reduce((toplam, item) => {
          const urun = urunlerListesi.find((u) => u.id === item.id)
          return toplam + (urun ? urun.fiyat * item.adet : 0)
        }, 0)
      },
    }),
    {
      name: 'zustand-sepet-storage',
      partialize: (state) => ({
        sepet: state.sepet,
        favoriler: state.favoriler,
        tema: state.tema, // Temayı localStorage'da tutuyoruz
      }),
    }
  )
)