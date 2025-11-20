import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Catalog(){
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ game: '', reward_type: '', min_price: '', max_price: '' })

  useEffect(()=>{ fetchProducts() }, [])

  async function fetchProducts(){
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v])=>{ if(v) params.set(k, v) })
    const res = await fetch(`${BACKEND}/api/products?${params.toString()}`)
    const data = await res.json()
    setProducts(data)
  }

  function updateFilter(k, v){
    const next = { ...filters, [k]: v }
    setFilters(next)
  }

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-6">
      <aside className="rounded-xl border border-white/10 p-4 bg-white/5 h-fit sticky top-24">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="space-y-3 text-sm">
          <div>
            <label className="block text-white/70 mb-1">Game</label>
            <select className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" value={filters.game} onChange={e=>updateFilter('game', e.target.value)}>
              <option value="">All</option>
              {['Fortnite','Roblox','Minecraft','CS2'].map(g=> <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-white/70 mb-1">Reward Type</label>
            <select className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" value={filters.reward_type} onChange={e=>updateFilter('reward_type', e.target.value)}>
              <option value="">All</option>
              {['skin','coins','item','bonus'].map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <input placeholder="Min $" className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" value={filters.min_price} onChange={e=>updateFilter('min_price', e.target.value)} />
            <input placeholder="Max $" className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" value={filters.max_price} onChange={e=>updateFilter('max_price', e.target.value)} />
          </div>
          <button onClick={fetchProducts} className="w-full mt-2 bg-sky-500 hover:bg-sky-400 text-white rounded px-3 py-2">Apply</button>
        </div>
      </aside>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p=> (
          <Link to={`/product/${p.id}`} key={p.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-sky-500/50 transition">
            <div className="aspect-video bg-gradient-to-br from-sky-500/10 to-blue-500/10" />
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-xs text-white/60 mt-1">{p.game} • {p.reward_type}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sky-400">${(p.price_cents/100).toFixed(2)}</span>
                <span className="text-white/70 text-xs">{(p.tags||[]).join(', ')}</span>
              </div>
            </div>
          </Link>
        ))}
        {products.length===0 && (
          <div className="col-span-full text-white/70">No products found. Adjust filters.</div>
        )}
      </section>
    </div>
  )
}
