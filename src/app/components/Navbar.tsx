"use client"

import React, { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    return (
        <nav className='flex flex-row justify-between items-center p-4 px-10'>
            <Link href="/"><h1 className='font-bold text-3xl'>Storyboard</h1></Link>
            {!isLoggedIn ? (<div className='flex flex-row mr-12'>
                <Link href="/login" className='mr-4'>Login</Link>
                {/* <Link href="/register">Register</Link> */}
            </div>) : (<p>User</p>)}
        </nav>
    )
}

export default Navbar