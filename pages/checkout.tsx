import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import Checkoutproduct from '../components/Checkoutproduct';
import Header from '../components/Header';
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice';
import CurrencyFormat from 'react-currency-format';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Stripe } from 'stripe';
import { fetchPostJSON } from '../utils/api-helper';
import getStripe from '../utils/get-stripejs';


function Checkout() {

    const [loading, setloading] = useState(false)
    const createCheckoutSession = async () => {
        setloading(true)
        // imported fetchpostjson from api file(inside utils)
        const checkoutsession: Stripe.Checkout.Session = await fetchPostJSON('/api/checkout_sessions', {
            items: items,
        })
        // i used any because there is not exact type of checkoutsession
        // for internal server errror=>500
        if ((checkoutsession as any).statusCode === 500) {
            console.error((checkoutsession as any).message);
            return
        }

        // redirect to checkout page
        const stripe = await getStripe()
        const { error } = await stripe!.redirectToCheckout({
            // get checkoutsession id from checkoutsesssion we created up
            sessionId: checkoutsession.id,
        })
        // error message if redirecttocheckout fails due to network etc
        console.warn(error.message)

        setloading(false)
    }

    const router = useRouter()
    const items = useSelector(selectBasketItems)
    const baskettotal = useSelector(selectBasketTotal)

    // for groupping items (if not define type will give error (key and value pair))
    const [groupeditemsinbasket, setgropeditemsinbasket] = useState({} as { [key: string]: Product[] })
    // everytime the item changes we will get item in results
    // if result item has same id it will be pushed in same id item(groping)
    //and if not same id it will be pushed in array
    // the followinf function will gropu items in a same place
    useEffect(() => {
        const gropeditems = items.reduce((results, item) => {
            (results[item._id] = results[item._id] || []).push(item)
            return results;
        }, {} as { [key: string]: Product[] })

        setgropeditemsinbasket(gropeditems)
    }, [items])
    return (
        <div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>
            <Head>
                <title>Shopping Bag</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='max-w-5xl mx-auto pb-24'>
                <div className='px-5'>
                    <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
                        {items.length > 0 ? "Review Your bag." : "Your Bag is Empty."}
                    </h1>
                    {
                        items.length === 0 && (
                            <Button
                                title='Online Shopping'
                                onClick={() => router.push('/')}
                            />
                        )
                    }
                </div>
                {/* using object.entries here because maping cannot be done directly */}
                {/* object.entries will return array of key,value pair */}
                {
                    items.length > 0 && (
                        <div className='mx-5 md:mx-8'>

                            {Object.entries(groupeditemsinbasket).map(([key, items]) => (
                                <Checkoutproduct key={key} items={items} id={key} />
                            ))}

                            <div className="my-12 mt-6 ml-auto max-w-3xl">
                                <div className="divide-y divide-gray-300">
                                    <div className="pb-4">
                                        <div className='flex justify-between'>
                                            <p>Subtotal</p>
                                            <p>   <CurrencyFormat value={baskettotal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Shipping </p>
                                            <p>$20 Will be added to toal amount </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-x-1 lg:flex-row">
                                                Estimated tax for:{" "}
                                                <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                                                    Enter zip code
                                                    <ChevronDownIcon className="h-6 w-6" />
                                                </p>
                                            </div>
                                            <p>$ -</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between pt-4 text-xl font-semibold'>
                                        <h4>Total</h4>
                                        <h4>
                                            <CurrencyFormat value={baskettotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                        </h4>
                                    </div>

                                </div>
                                <div className="my-14 space-y-4 ">
                                    <h4 className="text-xl font-semibold">
                                        How would you like to check out?
                                    </h4>
                                    <div className="flex flex-col gap-4 md:flex-row ">


                                        <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                                            <h4 className="mb-4 flex flex-col text-xl font-semibold ">
                                                PAY NOW
                                                <span>
                                                    <CurrencyFormat value={baskettotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                </span>

                                            </h4>

                                            <Button
                                                noIcon
                                                loading={loading}
                                                title="Check Out"
                                                width="w-full"
                                                onClick={createCheckoutSession}
                                            />
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    )
}

export default Checkout;