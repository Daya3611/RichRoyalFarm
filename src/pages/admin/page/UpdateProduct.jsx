import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;
    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center bg-gray-300">
    <div className="bg-white px-10 py-10 rounded-xl shadow-lg max-w-lg w-full h-[650px] overflow-auto hide-scrollbar" >
        <h1 className="text-center text-2xl font-bold text-blue-600 mb-6">Update Product</h1>
        <div>
            <input
                type="text"
                value={products.title}
                onChange={(e) => setProducts({ ...products, title: e.target.value })}
                name="title"
                className="bg-gray-100 mb-4 px-4 py-2 w-full rounded-lg border border-gray-300 text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Product Title"
            />
        </div>
        <div>
            <input
                type="text"
                value={products.price}
                onChange={(e) => setProducts({ ...products, price: e.target.value })}
                name="price"
                className="bg-gray-100 mb-4 px-4 py-2 w-full rounded-lg border border-gray-300 text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Total Product price"
            />
        </div>
        <div>
            <input
                type="text"
                value={products.imageUrl}
                onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                name="imageurl"
                className="mt-3 bg-gray-100 mb-4 px-4 py-2 w-full rounded-lg border border-gray-300 text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Product Image URL"
            />
        </div>
        <div>
            <input
                type="text"
                value={products.category}
                onChange={(e) => setProducts({ ...products, category: e.target.value.toLowerCase()})}
                name="category"
                className="mt-3 bg-gray-100 mb-4 px-4 py-2 w-full rounded-lg border border-gray-300 text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Product Category"
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
        <div>
            <textarea
                cols="30"
                rows="4"
                name="description"
                value={products.description}
                onChange={(e) => setProducts({ ...products, description: e.target.value })}
                className="bg-gray-100 mb-4 px-4 py-2 w-full rounded-lg border border-gray-300 text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Product Description"
            ></textarea>
        </div>
        <div className="flex justify-center mb-4">
            <button
                onClick={updateProduct}
                className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
            >
                Update Product
            </button>
        </div>
    </div>
</div>

    )
}

export default UpdateProduct