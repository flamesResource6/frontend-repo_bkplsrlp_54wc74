import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart(){
  const nav = useNavigate()
  const [items, setItems] = useState([])

  useEffect(()=>{
    setItems(JSON.parse(localStorage.getItem('cart')||'[]'))
  },[])

  const total = useMemo(()=> items.reduce((s,i)=> s + (i.price_cents||0) * i.quantity, 0), [items])

  function remove(idx){
    const next = items.slice(); next.splice(idx,1); setItems(next); localStorage.setItem('cart', JSON.stringify(next))
  }

  if(items.length===0) return (
    <div className="text-center text-white/70">
      Your cart is empty. <Link to="/catalog" className="text-sky-400">Browse products</Link>.
    </div>
  )

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <section className="space-y-4">
        {items.map((i, idx)=> (
          <div key={idx} className="rounded-xl border border-white/10 p-4 flex items-center justify-between bg-white/5">
            <div>
              <div className="font-semibold">{i.title}</div>
              <div className="text-sm text-white/70">${((i.price_cents||0)/100).toFixed(2)} x {i.quantity}</div>
            </div>
            <button onClick={()=>remove(idx)} className="text-white/70 hover:text-white text-sm">Remove</button>
          </div>
        ))}
      </section>
      <aside className="rounded-xl border border-white/10 p-4 bg-white/5 h-fit">
        <div className="flex items-center justify-between"><span>Subtotal</span><span>${(total/100).toFixed(2)}</span></div>
        <button onClick={()=>nav('/checkout')} className="w-full mt-4 bg-sky-500 hover:bg-sky-400 text-white rounded px-4 py-2">Checkout</button>
      </aside>
    </div>
  )
}
