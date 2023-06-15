'use client'
import Link from 'next/link'
import logo from '@/public/logo.webp'
import Image from 'next/image'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const [isNavHidden, setIsNavHidden] = useState(true)

  const toggleNav = () => {
    setIsNavHidden((prevState) => !prevState)
  }

  const hideNav = () => {
    setIsNavHidden(true)
  }

  return (
    <div className="container 2xl:max-w-7xl flex items-center justify-between py-8 px-4 md:px-8 mx-auto">
      {/* Logo */}
      <div className="flex">
        <Link href="/">
          <Image src={logo} alt="Pantry pilot logo" className="w-28" />
        </Link>
      </div>
      {/* Nav */}
      <div className="relative">
        {/* Hamburger Menu */}
        <button
          type="button"
          className="block md:hidden z-50 text-gray-800 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
          onClick={toggleNav}
        >
          <Menu />
        </button>
        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-40 transition overflow-y-auto"
            id="mobNav ${isNavHidden ? 'hidden' : ''}`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col text-4xl items-center gap-12 text-gray-800 font-bold px-8 py-4">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/login">
                  <button className="px-4 py-2 text-white border-2 rounded-lg border-rose-600 bg-rose-600">
                    Start Cooking
                  </button>
                </Link>
              </li>
              <button onClick={hideNav}>
                <X />
              </button>
            </ul>
          </div>
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-semibold">
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/login">
              <button className="px-4 py-2 text-white border-2 rounded-lg border-rose-600 bg-rose-600">
                Start Cooking
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
