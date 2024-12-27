import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext'
import '../../../Scrollbar.css'
function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;
    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white shadow-lg px-8 py-10 rounded-3xl w-full max-w-xl h-[650px] overflow-auto hide-scrollbar'>
                <h1 className='text-center text-gray-800 text-2xl mb-6 font-bold'>Add Product</h1>
                <div className='mb-4'>
                    <input
                        type="text"
                        value={products.title}
                        onChange={(e) => setProducts({ ...products, title: e.target.value })}
                        name='title'
                        className='bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='Product title'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type="number"
                        value={products.price}
                        onChange={(e) => setProducts({ ...products, price: e.target.value })}
                        name='price'
                        className='bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='Total Product price'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type="text"
                        value={products.category}
                        onChange={(e) => setProducts({ ...products, category: e.target.value.toLowerCase()})}
                        name='category'
                        className='bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='category'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type="text"
                        value={products.imageUrl}
                        onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                        name='imageurl'
                        className='bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='Product image URL'
                    />
                </div>
                <div className='mb-4'>
                    <input
                        type="text"
                        value={products.WholesaleQuantity}
                        onChange={(e) => setProducts({ ...products, WholesaleQuantity: e.target.value })}
                        name='WholesaleQuantity'
                        className='mt-3 bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='Wholesale Quantity'
                    />
                    <input
                        type="text"
                        value={products.WholesaleRate}
                        onChange={(e) => setProducts({ ...products, WholesaleRate: e.target.value })}
                        name='WholesaleRate'
                        className='mt-3 bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='Wholesale Rate'
                    />
                    <input
                        type="text"
                        value={products.RetailRate}
                        onChange={(e) => setProducts({ ...products, RetailRate: e.target.value })}
                        name='RetailRate'
                        className='mt-3 bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='Retail Rate'
                    />
                    <input
                        type="text"
                        value={products.GST}
                        onChange={(e) => setProducts({ ...products, GST: e.target.value })}
                        name='GST'
                        className='mt-3 bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='GST %'
                    />
                </div>
                <div className='mb-6'>
                    <textarea
                        cols="30"
                        rows="4"
                        name='description'
                        value={products.description}
                        onChange={(e) => setProducts({ ...products, description: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-4 py-3 w-full rounded-lg text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
                        placeholder='Product description'
                    />
                </div>
                <div className='flex justify-center'>
                    <button
                        onClick={addProduct}
                        className='bg-blue-500 hover:bg-blue-600 w-full text-black font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out'
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct

