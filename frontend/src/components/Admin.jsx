import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Admin(){
  const [token, setToken] = useState(localStorage.getItem('token')||'')
  const [form, setForm] = useState({ title:'', game:'Fortnite', reward_type:'coins', description:'', price_cents:999, tags:'' })
  const [codes, setCodes] = useState('')
  const [products, setProducts] = useState([])

  async function createProduct(){
    const payload = { ...form, images: [], currency: 'usd', active: true, tags: form.tags? form.tags.split(',').map(s=>s.trim()):[] }
    const res = await fetch(`${BACKEND}/api/admin/products`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token }, body: JSON.stringify(payload) })
    if(res.ok){ setForm({ title:'', game:'Fortnite', reward_type:'coins', description:'', price_cents:999, tags:'' }); loadProducts() }
  }

  async function addCodes(product_id){
    const codesList = codes.split(/\n|,/).map(s=>s.trim()).filter(Boolean)
    const res = await fetch(`${BACKEND}/api/admin/codes`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token }, body: JSON.stringify({ product_id, codes: codesList }) })
    if(res.ok){ setCodes('') }
  }

  async function loadProducts(){
    const res = await fetch(`${BACKEND}/api/products`)
    const data = await res.json()
    setProducts(data)
  }

  useEffect(()=>{ loadProducts() }, [])

  if(!token){
    return (
      <div className="text-white/70">Please sign in from the Account page as an admin to access this section.</div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <section className="rounded-xl border border-white/10 p-4 bg-white/5">
        <h2 className="font-semibold mb-3">Create Product</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Title" />
          <select value={form.game} onChange={e=>setForm({...form, game:e.target.value})} className="bg-black/30 border border-white/10 rounded px-3 py-2">
            {['Fortnite','Roblox','Minecraft','CS2'].map(g=> <option key={g}>{g}</option>)}
          </select>
          <select value={form.reward_type} onChange={e=>setForm({...form, reward_type:e.target.value})} className="bg-black/30 border border-white/10 rounded px-3 py-2">
            {['skin','coins','item','bonus'].map(t=> <option key={t}>{t}</option>)}
          </select>
          <input type="number" value={form.price_cents} onChange={e=>setForm({...form, price_cents: parseInt(e.target.value||'0')})} className="bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Price (cents)" />
          <input value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} className="bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Tags (comma separated)" />
          <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="sm:col-span-2 bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Description" />
        </div>
        <button onClick={createProduct} className="mt-3 bg-sky-500 hover:bg-sky-400 text-white rounded px-4 py-2">Create</button>
      </section>

      <section className="rounded-xl border border-white/10 p-4 bg-white/5">
        <h2 className="font-semibold mb-3">Add Codes to Product</h2>
        <textarea value={codes} onChange={e=>setCodes(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 mb-3" placeholder="Paste codes separated by new lines or commas" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map(p=> (
            <button key={p.id} onClick={()=>addCodes(p.id)} className="text-left rounded-lg border border-white/10 p-3 bg-white/5 hover:border-sky-500/50">
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-white/70">{p.game} • ${(p.price_cents/100).toFixed(2)}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
