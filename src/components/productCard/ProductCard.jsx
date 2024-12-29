import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'
import { Badge } from "@/components/ui/badge"
import { Image, ImageDown, Loader, Loader2, Loader2Icon, LoaderPinwheelIcon } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from 'react-router-dom'

export default function ProductCard() {
    const context = useContext(myContext)
    const { mode, product, searchkey, setSearchkey, filterType, setFilterType,
        filterPrice, setFilterPrice, } = context
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart);
    const uniqueCategories = new Set();
    
    // console.log(cartItems)

    const addCart = (product) => {
        dispatch(addToCart(product));
        setLoading(false);
        toast.success('add to cart');
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    
    
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='lg:min-w-[280px] '>
                <h1 className='text-[27px] text-black font-semibold mb-5 px-5 mt-5'>Category Name</h1>
                {isLoading ? (
                    <p className="text-2xl font-bold flex"> 
                    <img src="loder.gif" alt="loading" className="mx-auto mt-20 h-[100px] " />
                        {/* <Loader className='animate-spin h-9 w-9 text-blue-600'/>  */}
                        
                    </p>
                ):(
                    <div>
                    <div >
                        <span className='text-xl px-5 flex flex-col ' >
                        <span 
                            key="all-products" 
                            value={filterType}
                            onClick={() => setFilterType('')}
                            className={`text-md text-black before:content-[""] hover:before:left-auto hover:before:right-0 hover:before:duration-300 before:h-[1.5px] before:bg-blue-600 before:w-0 hover:before:w-full before:transition-all before:absolute relative before:left-0 before:-bottom-0.5 py-1 hover:font-bold hover:text-blue-600 cursor-pointer ${filterType === '' ? 'text-blue-600 font-bold' : ''}`}>
                            All Products
                        </span>

                        <div className='grid grid-cols-1 text-md -gap-1 items-center justify-center'>
                        {product.map((item) => {
                                if (!uniqueCategories.has(item.category)) {
                                    uniqueCategories.add(item.category);
                                    return (
                                        <Link 
                                            key={item.category} 
                                            to={`/category/${item.category.toString().toLowerCase().replace(/\s/g, '-')}`}
                                            className={`text-[18px] text-black before:content-[""] hover:before:left-auto hover:before:right-0 hover:before:duration-300 before:h-[2px] before:bg-blue-600 before:w-0 hover:before:w-full before:transition-all before:absolute relative before:left-0 before:-bottom-1 py-1 hover:font-bold hover:text-blue-600 cursor-pointer ${filterType === item.category ? 'text-blue-600 font-bold' : ''} transition-transform duration-300 ease-in-out transform hover:scale-105 capitalize`}>
                                            {item.category}
                                        </Link>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        </span>
                    </div>
                </div>
                )}
                
            </div>

            <div className='w-full  lg:px-2 '>
                <div className=' rounded-3xl '>
                
                    <section className="text-gray-600 body-font">
                        <div className="container px-9 py-5  mx-auto">
                            <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                            <h1 className="lg:text-3xl text-2xl title-font font-semibold mb-4 text-gray-900">
                                Trending Products
                                {/* <span className="text-blue-600 font-extrabold">Pro</span>
                                <span className="relative">
                                    <span className=" pb-1 font-semibold">ducts</span>
                                    <span className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-b from-white to-blue-600 rounded-xl opacity-75"></span>
                                </span> */}
                            </h1>
                                {/* <div className="h-1 w-20 bg-blue-600 rounded"></div> */}
                            </div>
                            {isLoading ? (
                                <div className="flex justify-center items-start h-screen pt-[80px]">
                                    <p className="text-2xl font-bold flex"> 
                                    <img src="./loder.gif" alt="loading" className="mx-auto mt-20 h-[95px] " />
                                        {/* <Loader className='animate-spin h-9 w-9 text-blue-600'/>  */}
                                    </p>
                                    
                                </div>
                            ) : (
                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 overflow-y-auto max-h-[800px] hide-scrollbar gap-2 md:gap-3">
                                {product.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                                    .filter((obj) => obj.category.toLowerCase().includes(filterType))
                                    .filter((obj) => filterPrice ? obj.price === filterPrice : true).map((item, index) => {
                                        const { title, price, description, category, imageUrl, id } = item;
                                        return (
                                            <div key={index} className=" w-full ">
                                                <div className="h-full transition-shadow duration-300 ease-in-out hover:border-blue-200 border-opacity-60 rounded-2xl overflow-hidden bg-[#fafafa] border">
                                                    <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer rounded-xl relative">
                                                        <img
                                                            className="rounded-xl h-30 md:h-40 w-full shadow-none object-fit hover:scale-110 transition-transform duration-300 ease-in-out -z-[100px]"
                                                            src={imageUrl}
                                                            alt="blog"
                                                            loading='lazy'
                                                        />
                                                        <div>
                                                        {price < 100 && (
                                                            <Badge className="absolute top-2 left-2 bg-blue-600 text-white" variant="destructive">Budget</Badge>
                                                        )}
                                                        {price >= 100 && price < 200 && (
                                                            <Badge className="absolute top-2 left-2 bg-blue-600 text-white" variant="destructive">Classic</Badge>
                                                        )}
                                                        {price >= 200 && price < 400 && (
                                                            <Badge className="absolute top-2 left-2 bg-yellow-600 text-white" variant="destructive">Premium</Badge>
                                                        )}
                                                        {price >= 400 && price < 600 && (
                                                            <Badge className="absolute top-2 left-2 bg-orange-600 text-white" variant="destructive">Gourmet</Badge>
                                                        )}
                                                        {price >= 600 && price < 800 && (
                                                            <Badge className="absolute top-2 left-2 bg-red-600 text-white" variant="destructive">Luxury Bites</Badge>
                                                        )}
                                                        {price >= 800 && (
                                                            <Badge className="absolute top-2 left-2 bg-purple-600 text-white" variant="destructive">Exclusive</Badge>
                                                        )}
                                                        </div>

                                                    </div>

                                                    <div className="pt-5 text-left px-2">
                                                        {/* for lg screen */}
                                                        <h1 className={`title-font font-medium text-gray-900 text-sm md:text-md hidden md:block`}><strong>{title.slice(0, 20)}</strong></h1>
                                                        {/* for sm screen */}
                                                        <h1 className={`title-font font-medium text-gray-900 text-sm md:text-md md:hidden`}><strong>{title.slice(0, 40)}</strong></h1>
                                                        
                                                        <div className='border-[1px] border-dotted'>

                                                        </div>
                                                        <p className="leading-relaxed text-md md:text-xl font-semibold text-blue-600">₹ {price}.00</p>
                                                        <div className='flex gap-2 items-center'>
                                                        <p className="leading-relaxed text-sm italic text-gray-400 line-through">₹ {parseInt(price,10)+150}.00</p>
                                                        <p className="text-xs text-red-600 font-medium">
                                                            {Math.round((150 / (parseInt(price, 10) + 150)) * 100)}% off
                                                        </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                            )}
                        </div>
                        
                    </section>
                
                </div> 
            </div>

        </div>
    )
}


// ${title.length > 20 ? 'text-lg' : 'text-xl'}