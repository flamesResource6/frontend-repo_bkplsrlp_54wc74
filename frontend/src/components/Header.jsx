import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, Gamepad2, User, Shield, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)
  const navItem = (to, label) => (
    <NavLink to={to} onClick={()=>setOpen(false)} className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'text-sky-400' : 'text-white/80 hover:text-white'}`}>
      {label}
    </NavLink>
  )
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <Gamepad2 className="text-sky-400" />
          <span className="font-semibold">BlueCodes</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItem('/', 'Home')}
          {navItem('/catalog', 'Catalog')}
          {navItem('/account', 'Account')}
          {navItem('/admin', 'Admin')}
          {navItem('/contact', 'Support')}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-white" />
          </Link>
          <button className="md:hidden" onClick={()=>setOpen(v=>!v)}>
            <Menu />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-1">
          <div className="flex flex-col">
            {navItem('/', 'Home')}
            {navItem('/catalog', 'Catalog')}
            {navItem('/account', 'Account')}
            {navItem('/admin', 'Admin')}
            {navItem('/contact', 'Support')}
          </div>
        </div>
      )}
    </header>
  )
}
