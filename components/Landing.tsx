import Image from 'next/image'
import React from 'react'
import Button from './Button'

function Landing() {
    return (
        // doing sticky so that we can move next div on top of this
        <section className='sticky top-0 mx-auto   flex  justify-between items-center h-screen max-w-[1350px] px-8'>
            <div className='space-y-8'>
                {/* tracking wide for letter spacing */}
                <h2 className='space-y-2 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl'>
                    {/* we want bg only to text so 
                    =>make text transparent 
                    =>bg-clip-text
                    */}
                    <span className='block bg-gradient-to-r from-pink-500 to via-violet-500 text-transparent bg-clip-text'>Jamshaid</span>
                    <span className='block'>Apple Store</span>
                    <span className='block'>Driven By Values</span>
                </h2>
                <div className='mt-4 ml-2 space-x-6'>
                    <Button title="Buy Now" />
                    <a className=' cursor-pointer text-lg font-medium relative before:absolute before:transition-all
                     before:duration-200 before:origin-left before:scale-x-0 before:inset-x-0 before:transform
                          before:rounded-bl
                    before:bg-black before:-bottom-1.5 before:h-0.5
                    hover:before:scale-x-100
                    '>Learn More</a>

                </div>
            </div>

            <div className='relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline
            lg:h-[600px] lg:w-[600px]
            '>
                <Image src="/iphone.png" layout='fill' objectFit='contain' />
            </div>
        </section>
    )
}

export default Landing