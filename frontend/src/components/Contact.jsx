import { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Contact(){
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  async function submit(){
    const res = await fetch(`${BACKEND}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, subject, message }) })
    if(res.ok) setSent(true)
  }

  if(sent){
    return <div className="max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold">Thanks!</h1>
      <p className="text-white/70">We received your message and will get back to you.</p>
    </div>
  }

  return (
    <div className="max-w-md mx-auto space-y-3">
      <h1 className="text-2xl font-bold">Contact Support</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Email" />
      <input value={subject} onChange={e=>setSubject(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" placeholder="Subject" />
      <textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2" rows={5} placeholder="Message" />
      <button onClick={submit} className="bg-sky-500 hover:bg-sky-400 text-white rounded px-4 py-2">Send</button>
    </div>
  )
}
