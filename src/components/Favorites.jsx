import { useEffect, useState } from 'react'
import { Star, Loader2 } from 'lucide-react'

export default function Favorites() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/favorites`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || 'Failed')
      setItems(json.items || json.data || json)
    } catch (e) {
      setItems([{ error: e.message }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-slate-800/50 border border-blue-400/20 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-yellow-300" />
        <h3 className="text-white font-semibold">Saved Profiles</h3>
      </div>
      {loading ? (
        <div className="text-blue-200 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading...</div>
      ) : (
        <div className="grid gap-2">
          {items.map((it) => (
            it.error ? (
              <div key={Math.random()} className="text-red-300 text-sm">{it.error}</div>
            ) : (
              <div key={it._id} className="p-3 rounded-lg bg-slate-900/50 border border-blue-400/10">
                <div className="text-blue-200 text-xs uppercase tracking-wide mb-1">{it.game}</div>
                <div className="text-white font-medium">{it.label}</div>
                {it.payload?.skills && (
                  <div className="text-blue-200/80 text-sm mt-1">OSRS profile saved</div>
                )}
                {it.payload?.name && (
                  <div className="text-blue-200/80 text-sm mt-1">FFXIV: {it.payload.name} • {it.payload.server}</div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
}
