import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SearchIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/outline'
import { selectBasketItems } from '../redux/basketSlice';
import { useSelector } from 'react-redux'
import { signIn, signOut, useSession } from 'next-auth/react';
function Header() {
    const { data: session } = useSession()

    // get all items in basket from store
    const items = useSelector(selectBasketItems)
    return (
        <header className='sticky top-0 z-30 flex w-full items-center justify-between p-4 bg-[#E7ECEE] ' >

            <div className='flex items-center justify-center md:w-1/5'>
                <Link href="/">
                    <div className='relative h-10  cursor-pointer w-5 opacity-60 transition hover:opacity-100'>
                        {/* for optimization use layout=fill and parent tag as relative
                */}
                        <Image src="https://rb.gy/vsvv2o" layout="fill" objectFit='contain' />
                    </div>
                </Link>
            </div>
            <div className='hidden flex-1 justify-center items-center space-x-4  md:flex'>
                <a href="" className='cursor-pointer opacity-60 transition hover:opacity-100 font-medium'>Home</a>
                <a href="#productwala" className='cursor-pointer opacity-60 transition hover:opacity-100 font-medium'>Products</a>
                <a href="" className='cursor-pointer opacity-60 transition hover:opacity-100 font-medium'>Contact Us!</a>
            </div>

            <div className='flex items-center justify-center gap-x-5    md:w-1/5 '>

                <SearchIcon className='h-5 w-5 cursor-pointer opacity-60 transition hover:opacity-100' />
                <Link href="/checkout">
                    <div className='relative cursor-pointer'>
                        <span className='absolute -right-1 -top-1 z-50 flex h-4 w-4 font-bold items-center justify-center rounded-full
                    bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm
                    '>
                            {items.length}
                        </span>
                        <ShoppingBagIcon className='h-5 w-5 cursor-pointer opacity-60 transition hover:opacity-100' />
                    </div>
                </Link>
                {
                    session ? (
                        <Image
                            src={session.user?.image || "/ava.webp"}
                            height={34}
                            width={34}
                            className="rounded-full cursor-pointer"
                            onClick={() => signOut()}
                        />
                    ) : (
                        <UserIcon className='h-5 w-5 cursor-pointer opacity-60 transition hover:opacity-100'
                            onClick={() => signIn()}
                        />
                    )
                }
            </div>
        </header>
    )
}

export default Header