import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Account(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token')||'')
  const [orders, setOrders] = useState([])

  async function login(){
    const res = await fetch(`${BACKEND}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const data = await res.json()
    if(res.ok){ localStorage.setItem('token', data.access_token); setToken(data.access_token) }
  }

  async function register(){
    const res = await fetch(`${BACKEND}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const data = await res.json()
    if(res.ok){ localStorage.setItem('token', data.access_token); setToken(data.access_token) }
  }

  async function loadOrders(){
    const res = await fetch(`${BACKEND}/api/orders`, { headers: { 'Authorization': token } })
    const data = await res.json()
    if(res.ok){ setOrders(data) }
  }

  useEffect(()=>{ if(token) loadOrders() }, [token])

  if(!token){
    return (
      <div className="max-w-md mx-auto space-y-3">
        <h1 className="text-2xl font-bold">Account</h1>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Password" />
        <div className="flex gap-3">
          <button onClick={login} className="bg-sky-500 hover:bg-sky-400 text-white rounded px-4 py-2">Login</button>
          <button onClick={register} className="bg-white/10 hover:bg-white/20 text-white rounded px-4 py-2">Register</button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <button onClick={()=>{localStorage.removeItem('token'); setToken('')}}} className="text-sm text-white/70 hover:text-white">Sign out</button>
      </div>
      <div className="grid gap-4">
        {orders.map(o=> (
          <div key={o.id} className="rounded-xl border border-white/10 p-4 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Order #{o.id.slice(-6)}</div>
              <div className="text-sky-400">${(o.total_cents/100).toFixed(2)}</div>
            </div>
            <div className="text-sm text-white/70 mt-1">{o.items.length} item(s) • {o.status}</div>
            {o.delivered_codes?.length>0 && (
              <div className="mt-3 text-sm">
                <div className="font-medium">Codes</div>
                <div className="font-mono text-sky-400">{o.delivered_codes.join(', ')}</div>
              </div>
            )}
          </div>
        ))}
        {orders.length===0 && <div className="text-white/70">No orders yet.</div>}
      </div>
    </div>
  )
}
