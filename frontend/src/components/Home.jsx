import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, Star, Flame } from 'lucide-react'

const features = [
  { title: 'Featured Rewards', desc: 'Exclusive skins and coin packs for top titles.', icon: Sparkles },
  { title: 'Instant Delivery', desc: 'Codes appear on-screen and via email after checkout.', icon: ArrowRight },
  { title: 'Secure Payments', desc: 'Pay with Stripe or your saved card.', icon: Star },
]

export default function Home(){
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 overflow-hidden">
        <div className="px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Unlock premium rewards for your favorite games
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Skins, coins, item bundles and more for Fortnite, Roblox, Minecraft, and CS2.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/catalog" className="px-5 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-md font-medium shadow">
              Browse Catalog
            </Link>
            <a href="#popular" className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md font-medium">Popular</a>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        {features.map((f, i)=> (
          <div key={i} className="rounded-xl border border-white/10 p-6 bg-white/5">
            <f.icon className="text-sky-400" />
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="text-white/70 text-sm mt-1">{f.desc}</p>
          </div>
        ))}
      </section>

      <section id="popular" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular right now</h2>
          <Link to="/catalog" className="text-sky-400 hover:underline">See all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Fortnite V-Bucks 1000','Roblox 800 Robux','Minecraft Minecoins 1720','CS2 Skin Case Key'].map((name, idx)=> (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-sky-500/10 to-blue-500/10" />
              <div className="p-4">
                <h3 className="font-semibold">{name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sky-400">${(9.99 + idx*3).toFixed(2)}</span>
                  <Link to="/catalog" className="text-sm text-white/80 hover:text-white flex items-center gap-1">Buy <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
