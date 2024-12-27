import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { File } from 'lucide-react';



function DashboardTab() {
    const context = useContext(myContext)
    const { mode, product, edithandle, deleteProduct, order, user } = context
    const [searchQuery, setSearchQuery] = useState('');

    // Filter orders based on the search query
    const filteredOrders = order.filter(allorder =>
        allorder.addressInfo.phoneNumber.includes(searchQuery)
    );

    const filteredProducts = product.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // console.log(product)
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const add = () => {
        window.location.href = '/addproduct'
    }
    return (
        <>
            <div className="container mx-auto p-4">
                <div className="tab container mx-auto">
                    <Tabs defaultIndex={0} className="">
                        <TabList className="md:flex md:space-x-8 bg-gray-100 p-4 rounded-lg shadow-md grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
                            <Tab>
                                <button
                                    type="button"
                                    className="font-medium border bg-gray-200 text-gray-700 rounded-lg text-xl hover:border-blue-500 hover:text-blue-500 px-5 py-2.5 text-center flex gap-2 items-center justify-center"
                                >
                                    <MdOutlineProductionQuantityLimits /> Products
                                </button>
                            </Tab>
                            <Tab>
                                <button
                                    type="button"
                                    className="font-medium border bg-gray-200 text-gray-700 rounded-lg text-xl hover:border-blue-500 hover:text-blue-500 px-5 py-2.5 text-center flex gap-2 items-center justify-center"
                                >
                                    <AiFillShopping /> Order
                                </button>
                            </Tab>
                            <Tab>
                                <button
                                    type="button"
                                    className="font-medium border bg-gray-200 text-gray-700 rounded-lg text-xl hover:border-blue-500 hover:text-blue-500 px-5 py-2.5 text-center flex gap-2 items-center justify-center"
                                >
                                    <FaUser /> Users
                                </button>
                            </Tab>
                            <Tab>
                                <Link href="https://file-share-site-ten.vercel.app/">
                                    <button
                                        type="button"
                                        className="font-medium border bg-gray-200 text-gray-700 rounded-lg text-xl hover:border-blue-500 hover:text-blue-500 px-5 py-2.5 text-center flex gap-2 items-center justify-center"
                                    >
                                        <File />File Uplode
                                    </button>
                                </Link>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className="px-4 md:px-0 mb-16">
                                <h1 className="text-center mb-5 text-3xl font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                    Product Details
                                </h1>
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={add}
                                        type="button"
                                        className="focus:outline-none p-3 text-white bg-blue-600 border hover:bg-blue-700 outline-0 font-medium rounded-2xl text-sm px-4 py-2.5 mb-2 shadow-lg transition duration-200 ease-in-out"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(34 42 49)' : '', color: mode === 'dark' ? 'white' : '', }}
                                    >
                                        <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div>
                                    </button>
                                </div>
                                <div className="relative overflow-x-auto p-6 bg-white dark:bg-gray-200 rounded-xl shadow-md">
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Find by name..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                                            className="p-2 border rounded-lg w-full"
                                        />
                                    </div>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-white uppercase bg-blue-500 rounded-t-xl">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">S.No</th>
                                                <th scope="col" className="px-6 py-3">Image</th>
                                                <th scope="col" className="px-6 py-3">Title</th>
                                                <th scope="col" className="px-6 py-3">Price</th>
                                                <th scope="col" className="px-6 py-3">Category</th>
                                                <th scope="col" className="px-6 py-3">Date</th>
                                                <th scope="col" className="px-6 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        {filteredProducts.map((item, index) => {
                                            const { title, price, imageUrl, category, date } = item;
                                            return (
                                                <tr key={index} className="bg-gray-50 border-b dark:border-gray-700"
                                                    style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {index + 1}.
                                                    </td>
                                                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                        <img className='w-16' src={imageUrl} alt="img" />
                                                    </th>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {title}
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        ₹{price}
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {category}
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {date}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <div className="flex gap-2 cursor-pointer text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                <div onClick={() => deleteProduct(item)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>
                                                                </div>
                                                                <Link to={'/updateproduct'}>
                                                                    <div onClick={() => edithandle(item)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                        </svg>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="relative overflow-x-auto mb-16 p-6 bg-white dark:bg-gray-200 rounded-xl shadow-md">
                                <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                    Order Details
                                </h1>
                                <div className="mb-5">
                                    <input
                                        type="text"
                                        placeholder="Search by mobile number"
                                        className="w-full p-2 border rounded-lg"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {filteredOrders.map((allorder, index) => {
                                    // Group items by their ID and accumulate quantity
                                    const itemQuantities = {};

                                    allorder.cartItems.forEach((item) => {
                                        if (itemQuantities[item.id]) {
                                            itemQuantities[item.id].quantity += 1;
                                        } else {
                                            itemQuantities[item.id] = { ...item, quantity: 1 };
                                        }
                                    });

                                    // Convert grouped items back into an array
                                    const uniqueItems = Object.values(itemQuantities);

                                    return (
                                        <table key={index} className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-5">
                                            <thead className="text-xs text-white uppercase bg-blue-500 rounded-t-xl">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">Date</th>
                                                    <th scope="col" className="px-6 py-3">Payment Id</th>
                                                    <th scope="col" className="px-6 py-3">Image</th>
                                                    <th scope="col" className="px-6 py-3">Title</th>
                                                    <th scope="col" className="px-6 py-3">Price</th>
                                                    <th scope="col" className="px-6 py-3">Quantity</th>
                                                    <th scope="col" className="px-6 py-3">Category</th>
                                                    <th scope="col" className="px-6 py-3">Name</th>
                                                    <th scope="col" className="px-6 py-3">Address</th>
                                                    <th scope="col" className="px-6 py-3">Pincode</th>
                                                    <th scope="col" className="px-6 py-3">Phone Number</th>
                                                    <th scope="col" className="px-6 py-3">Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {uniqueItems.map((item, idx) => {
                                                    const { title, category, imageUrl, price, quantity } = item;
                                                    return (
                                                        <tr key={idx} className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.date}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.paymentId}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <img className='w-16' src={imageUrl} alt="item image" />
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {title}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                ₹{price}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {quantity}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {category}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.addressInfo.name}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.addressInfo.address}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.addressInfo.pincode}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.addressInfo.phoneNumber}
                                                            </td>
                                                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                {allorder.email}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    );
                                })}
                            </div>

                        </TabPanel>

                        <TabPanel>
                            <div className="relative overflow-x-auto mb-10 p-6 bg-white dark:bg-gray-200 rounded-xl shadow-md">
                                <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                                    User Details
                                </h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-white uppercase bg-blue-500 rounded-t-xl">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">S.No</th>
                                            <th scope="col" className="px-6 py-3">Name</th>
                                            <th scope="col" className="px-6 py-3">Email</th>
                                            <th scope="col" className="px-6 py-3">Uid</th>
                                        </tr>
                                    </thead>
                                    {user.map((item, index) => {
                                        const { name, uid, email } = item;
                                        return (
                                            <tbody key={index}>
                                                <tr className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {index + 1}.
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {name}
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {email}
                                                    </td>
                                                    <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                        {uid}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </div>
                        </TabPanel>
                        <TabPanel>

                            <iframe src="https://file-share-site-ten.vercel.app/" frameborder="0" height="500px" width="100%"></iframe>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>

        </>
    )
}


export default DashboardTab