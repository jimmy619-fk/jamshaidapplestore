import { ChevronDownIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import CurrencyFormat from 'react-currency-format';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from '../redux/basketSlice';
// npm i react-currency-format
import { urlFor } from '../sanity'

interface Props {
    items: Product[]
    id: string
}


function Checkoutproduct({ id, items }: Props) {
    const dispatch = useDispatch()
    const removefrombasket = () => {
        dispatch(removeFromBasket({ id }));
        toast.error(`${items[0].title} removed from basket`, {
            position: "bottom-center",
        });


    }
    return (
        <div className='flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center'>
            <div className='relative h-44 w-44 '>
                {/* we only want one item
                suppose if there are 5 same ipads only one will be selected 
                we only want to show product once
                */}
                <Image src={urlFor(items[0].image[0]).url()} layout="fill" objectFit='contain' />
            </div>
            <div className='flex flex-1 items-end lg:items-center p-5'>
                <div className='flex-1 space-y-4'>
                    <div className='flex flex-col gap-x-8 text-xl  lg:flex-row lg:text-2xl'>
                        <h4 className='font-semibold lg:w-96'>
                            {items[0].title}
                        </h4>
                        <p className='flex items-end gap-x-1 font-semibold'>
                            {items.length}
                            <ChevronDownIcon className='h-6 w-6 text-blue-500' />
                        </p>
                    </div>
                    <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                        Show product details
                        <ChevronDownIcon className='h-6 w-6 ' />
                    </p>
                </div>
                {/* currency */}
                <div className='flex flex-col items-end space-y-4 '>
                    <h4 className="text-xl font-semibold lg:text-2xl">





                        <CurrencyFormat value={items.reduce((total, item) => total + item.price, 0)} displayType={'text'} thousandSeparator={true} prefix={'$'} />

                    </h4>
                    <button
                        onClick={removefrombasket}
                        className="text-blue-500 hover:underline"
                    >
                        Remove
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Checkoutproduct