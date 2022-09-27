import React, { useEffect, useState } from 'react'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'

function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const { logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className='flex items-center space-x-2 md:space-x-10'>
                <img
                    src='https://top10.netflix.com/images/logo.png'
                    width={100}
                    height={100}
                    className=""
                />
                <ul className='hidden space-x-4 md:flex'>
                    <li>Home</li>
                    <li>TV show</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                </ul>
            </div>

            <div className='flex items-center space-x-4 text-sm'>
                <MagnifyingGlassIcon className='hidden h-6 w-6 sm:inline' />
                <p className='hidden lg:inline'>Kids</p>
                <BellIcon className='h-6 w-6' />
                {/* <Link href="/account"> */}
                <img
                    onClick={logout}
                    src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                    alt=''
                    className='h-6 w-6 rounded'
                />
                {/* </Link> */}
            </div>
        </header>
    )
}

export default Header