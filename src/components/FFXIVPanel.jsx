import { useState } from 'react'
import { Users2, Loader2 } from 'lucide-react'

export default function FFXIVPanel({ onSave }) {
  const [name, setName] = useState('')
  const [world, setWorld] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const search = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setResults([])
    try {
      const res = await fetch(`${baseUrl}/api/ffxiv/character`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, world })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || 'Failed')
      setResults(json.results || [])
    } catch (e) {
      setResults([{ error: e.message }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-400/20 rounded-xl p-4">
      <form onSubmit={search} className="grid sm:grid-cols-3 gap-2 mb-4">
        <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Character name"
          className="px-3 py-2 rounded-lg bg-slate-900/60 border border-blue-400/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring focus:ring-blue-500/30"
        />
        <input
          value={world}
          onChange={(e)=>setWorld(e.target.value)}
          placeholder="World (optional)"
          className="px-3 py-2 rounded-lg bg-slate-900/60 border border-blue-400/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring focus:ring-blue-500/30"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg border border-blue-300/30 hover:bg-blue-600 transition flex items-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Users2 className="w-4 h-4"/>}
          Search
        </button>
      </form>

      <div className="grid gap-2">
        {results.map((r, idx) => (
          r.error ? (
            <div key={idx} className="text-red-300 text-sm">{r.error}</div>
          ) : (
            <div key={r.id} className="p-3 rounded-lg bg-slate-900/50 border border-blue-400/10 flex items-center gap-3">
              <img src={r.avatar} alt="avatar" className="w-10 h-10 rounded" />
              <div className="flex-1">
                <div className="text-white font-medium">{r.name}</div>
                <div className="text-blue-200 text-sm">{r.server} {r.data_center ? `• ${r.data_center}` : ''}</div>
              </div>
              <button
                onClick={() => onSave({
                  game: 'ffxiv',
                  label: `${r.name} • ${r.server}`,
                  identifier: String(r.id),
                  payload: r
                })}
                className="text-xs px-3 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Save
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
