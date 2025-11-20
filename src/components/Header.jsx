import { Gamepad2, Star, Search } from 'lucide-react'

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'osrs', label: 'OSRS Stats' },
    { key: 'ffxiv', label: 'FFXIV Characters' },
    { key: 'favorites', label: 'Favorites' },
  ]

  return (
    <header className="relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-400/20">
            <Gamepad2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">MMORPG Helper</h1>
            <p className="text-sm text-blue-200/70">Quick stats and lookups for popular games</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-blue-200/70">
          <Search className="w-4 h-4" />
          <span className="text-sm">Use the panels below to search</span>
        </div>
      </div>

      <nav className="flex gap-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg border transition-all text-sm ${
              activeTab === t.key
                ? 'bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/20'
                : 'bg-slate-800/50 text-blue-200/80 border-blue-400/20 hover:border-blue-400/40'
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-blue-200/70">
          <Star className="w-4 h-4" />
          <span className="text-sm hidden sm:inline">Save profiles you care about</span>
        </div>
      </nav>
    </header>
  )
}
