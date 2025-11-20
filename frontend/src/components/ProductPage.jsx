import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductPage(){
  const { id } = useParams()
  const nav = useNavigate()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(()=>{ (async()=>{
    const res = await fetch(`${BACKEND}/api/products/${id}`)
    if(res.ok){ setProduct(await res.json()) }
  })() }, [id])

  function addToCart(){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    const existing = cart.find(i=>i.product_id===id)
    if(existing){ existing.quantity += qty } else { cart.push({ product_id: id, quantity: qty, title: product.title, price_cents: product.price_cents }) }
    localStorage.setItem('cart', JSON.stringify(cart))
    nav('/cart')
  }

  if(!product) return <div className="text-white/70">Loading...</div>

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
        <div className="aspect-video bg-gradient-to-br from-sky-500/10 to-blue-500/10" />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-white/70 mt-2">{product.description}</p>
        <div className="mt-4 text-sky-400 text-xl font-semibold">${(product.price_cents/100).toFixed(2)}</div>
        <div className="mt-4 flex items-center gap-3">
          <label className="text-white/70">Qty</label>
          <input type="number" min={1} max={10} className="w-20 bg-black/30 border border-white/10 rounded px-3 py-2" value={qty} onChange={e=>setQty(parseInt(e.target.value||'1'))} />
        </div>
        <button onClick={addToCart} className="mt-6 bg-sky-500 hover:bg-sky-400 text-white rounded px-5 py-3">Buy Now</button>
      </div>
    </div>
  )
}
