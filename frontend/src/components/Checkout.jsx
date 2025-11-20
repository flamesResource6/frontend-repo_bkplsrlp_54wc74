import { useEffect, useMemo, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout(){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [clientSecret, setClientSecret] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [codes, setCodes] = useState([])
  const items = JSON.parse(localStorage.getItem('cart')||'[]').map(i=> ({ product_id: i.product_id || i.product_id || i.id || i.productId || i.product_id, quantity: i.quantity }))
  const subtotal = useMemo(()=> (JSON.parse(localStorage.getItem('cart')||'[]')).reduce((s,i)=> s + (i.price_cents||0) * i.quantity, 0), [])

  async function init(){
    const res = await fetch(`${BACKEND}/api/checkout/init`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, email, name }) })
    const data = await res.json()
    if(res.ok){ setClientSecret(data.client_secret||null); setOrderId(data.order_id) }
  }

  async function confirm(){
    const res = await fetch(`${BACKEND}/api/checkout/confirm`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order_id: orderId, provider: 'stripe' }) })
    const data = await res.json()
    if(res.ok){ setCodes(data.codes); localStorage.removeItem('cart') }
  }

  if(codes.length>0){
    return (
      <div className="max-w-xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold">Your Codes</h1>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          {codes.map((c,i)=> <div key={i} className="font-mono text-sky-400 text-lg">{c}</div>)}
        </div>
        <p className="text-white/70 text-sm">We've also sent these to your email if configured.</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="rounded-xl border border-white/10 p-4 bg-white/5 space-y-3">
        <div>
          <label className="block text-sm text-white/70 mb-1">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Name (optional)</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Your name" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Subtotal</span><span>${(subtotal/100).toFixed(2)}</span>
        </div>
        {!orderId ? (
          <button onClick={init} className="w-full bg-sky-500 hover:bg-sky-400 text-white rounded px-4 py-2">Continue</button>
        ) : (
          <button onClick={confirm} className="w-full bg-green-600 hover:bg-green-500 text-white rounded px-4 py-2">Confirm Payment</button>
        )}
      </div>
      {clientSecret && <div className="text-xs text-white/60">Stripe client secret received.</div>}
    </div>
  )
}
