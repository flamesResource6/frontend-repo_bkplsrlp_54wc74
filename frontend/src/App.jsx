import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Catalog from './components/Catalog'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Account from './components/Account'
import Admin from './components/Admin'
import Contact from './components/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0b0f19] text-white">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-white/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} BlueCodes — Digital Rewards Store</p>
            <nav className="flex gap-6">
              <Link className="hover:text-sky-400" to="/contact">Support</Link>
              <a className="hover:text-sky-400" href="#">Privacy</a>
              <a className="hover:text-sky-400" href="#">Terms</a>
            </nav>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
