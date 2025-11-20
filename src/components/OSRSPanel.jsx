import { useState } from 'react'
import { Swords, Loader2 } from 'lucide-react'

export default function OSRSPanel({ onSave }) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchStats = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    setLoading(true)
    setData(null)
    try {
      const res = await fetch(`${baseUrl}/api/osrs/stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || 'Failed')
      setData(json)
    } catch (e) {
      setData({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  const bestSkills = () => {
    if (!data?.skills) return []
    const entries = Object.entries(data.skills).filter(([k]) => k !== 'Overall')
    return entries.sort((a,b) => b[1].level - a[1].level).slice(0,5)
  }

  return (
    <div className="bg-slate-800/50 border border-blue-400/20 rounded-xl p-4">
      <form onSubmit={fetchStats} className="flex gap-2 mb-4">
        <div className="flex-1">
          <input
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="OSRS username"
            className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-blue-400/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring focus:ring-blue-500/30"
          />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg border border-blue-300/30 hover:bg-blue-600 transition flex items-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Swords className="w-4 h-4"/>}
          Fetch
        </button>
      </form>

      {data?.error && (
        <div className="text-red-300 text-sm">{data.error}</div>
      )}

      {data?.skills && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold">Top skills</h3>
            <button
              onClick={() => onSave({
                game: 'osrs',
                label: `${data.username}`,
                identifier: data.username,
                payload: data
              })}
              className="text-xs px-3 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Save
            </button>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {bestSkills().map(([skill, info]) => (
              <li key={skill} className="p-3 rounded-lg bg-slate-900/50 border border-blue-400/10 flex items-center justify-between">
                <span className="text-blue-200">{skill}</span>
                <span className="text-white font-semibold">Lvl {info.level}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
