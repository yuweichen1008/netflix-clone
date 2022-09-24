import React from 'react'
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

function Header() {
    return (
        <header>
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
                <Link href="/account">
                    <img 
                        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                        alt=''
                        className='h-6 w-6 rounded'
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header