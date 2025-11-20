import { useState } from 'react'
import Header from './components/Header'
import OSRSPanel from './components/OSRSPanel'
import FFXIVPanel from './components/FFXIVPanel'
import Favorites from './components/Favorites'

function App() {
  const [activeTab, setActiveTab] = useState('osrs')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const saveFavorite = async (fav) => {
    try {
      const res = await fetch(`${baseUrl}/api/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fav)
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || 'Failed')
      alert('Saved to favorites')
    } catch (e) {
      alert(`Save failed: ${e.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_top_left,rgba(59,130,246,0.12),transparent)]"/>
      <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_bottom_right,rgba(99,102,241,0.12),transparent)]"/>

      <div className="relative max-w-4xl mx-auto px-4 py-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6 grid gap-6">
          {activeTab === 'osrs' && <OSRSPanel onSave={saveFavorite} />}
          {activeTab === 'ffxiv' && <FFXIVPanel onSave={saveFavorite} />}
          {activeTab === 'favorites' && <Favorites />}
        </div>

        <footer className="mt-12 text-center text-blue-200/60 text-sm">
          Built for gamers. Add more games anytime.
        </footer>
      </div>
    </div>
  )
}

export default App
