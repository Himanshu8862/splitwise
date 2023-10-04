"use client";

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {

    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-green-400 w-full mb-16 py-3 px-6">
            <Link href="/" className="flex items-center space-x-2">
                <Image
                    src="/logo.png"
                    alt="Splitwise logo"
                    width={45}
                    height={45}
                    className="object-contain"
                />
                <p className="text-white font-bold text-4xl">Splitwise</p>
            </Link>

            {session?.user ? (
                <div className="flex items-center space-x-4">
                    <Link href="/profile">
                        <p className="text-white font-bold">{session?.user?.name}</p>
                    </Link>
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <>
                    {/* Add login/signup links or buttons here if needed */}
                </>
            )}
        </nav>

    )
}

export default NavBar