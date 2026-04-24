import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openSearch = () => {
    setIsSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsSearchOpen(false)
      setQuery('')
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      {/* Left: logo + nav */}
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <img
            src="https://top10.netflix.com/images/logo.png"
            width={100}
            height={100}
            alt="Netflix"
            className="cursor-pointer"
          />
        </Link>
        <ul className="hidden space-x-4 md:flex text-sm text-gray-300">
          <li className="cursor-pointer hover:text-white transition">Home</li>
          <li className="cursor-pointer hover:text-white transition">TV Shows</li>
          <li className="cursor-pointer hover:text-white transition">Movies</li>
          <li className="cursor-pointer hover:text-white transition">New & Popular</li>
          <li className="cursor-pointer hover:text-white transition">My List</li>
        </ul>
      </div>

      {/* Right: search + auth */}
      <div className="flex items-center space-x-4 text-sm">
        {/* Expanding search */}
        <div className="flex items-center">
          {isSearchOpen ? (
            <div className="flex items-center space-x-1 rounded border border-white/40 bg-black/60 px-2 py-1">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-300 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Titles, people, genres"
                className="w-40 bg-transparent text-sm text-white placeholder-gray-400 outline-none"
              />
              <XMarkIcon
                className="h-4 w-4 cursor-pointer text-gray-400 hover:text-white"
                onClick={() => { setIsSearchOpen(false); setQuery('') }}
              />
            </div>
          ) : (
            <MagnifyingGlassIcon
              className="h-5 w-5 cursor-pointer hover:text-gray-300 transition"
              onClick={openSearch}
            />
          )}
        </div>

        {user ? (
          /* Signed-in: avatar + email + logout */
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={logout}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="avatar"
              className="h-7 w-7 rounded"
            />
            <span className="hidden max-w-[120px] truncate text-xs text-gray-300 group-hover:text-white transition lg:inline">
              {user.email}
            </span>
          </div>
        ) : (
          /* Guest: Sign In + Sign Up */
          <div className="flex items-center space-x-2">
            <Link href="/login">
              <span className="cursor-pointer rounded px-3 py-1 text-sm font-medium text-white hover:text-gray-300 transition">
                Sign In
              </span>
            </Link>
            <Link href="/login">
              <span className="cursor-pointer rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700 transition">
                Sign Up
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
