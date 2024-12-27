import React, { useContext } from 'react';
import { FaProductHunt, FaUserTie } from 'react-icons/fa';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import { BaggageClaim, Calendar, DatabaseBackup, LineChart, ListOrdered, ListOrderedIcon, User, User2 } from 'lucide-react';
import { MdCategory, MdOutlineDriveFolderUpload, MdProductionQuantityLimits } from 'react-icons/md';
import AddProduct from '../page/AddProduct';

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


function Dashboard() {
    const context = useContext(myContext);
    const { mode, product, edithandle, category, order, user } = context
    const today = new Date();
    const formattedDate = formatDate(today);

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap -m-4 text-center">
                        {/* Total Products */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 bg-gray-100 border-gray-300 px-4 py-3 rounded-xl">
                                <div className="text-blue-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <MdProductionQuantityLimits size={50} />
                                    
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1">{product.length}</h2>
                                <p className="text-blue-500 font-bold">Total Products</p>
                            </div>
                        </div>
                        {/* Total Orders */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 bg-gray-100 border-gray-300 px-4 py-3 rounded-xl">
                                <div className="text-blue-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <ListOrdered size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1">{order.length}</h2>
                                <p className="text-blue-500 font-bold">Total Orders</p>
                            </div>
                        </div>
                        {/* Total Users */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 bg-gray-100 border-gray-300 px-4 py-3 rounded-xl">
                                <div className="text-blue-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <User2 size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1">{user.length}</h2>
                                <p className="text-blue-500 font-bold">Total Users</p>
                            </div>
                        </div>
                        {/* Total Categories */}
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className="border-2 bg-gray-100 border-gray-300 px-4 py-3 rounded-xl">
                                <div className="text-blue-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <Calendar size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1">{formattedDate}</h2>
                                <p className="text-blue-500 font-bold">Date</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DashboardTab />
            </section>
        </Layout>
    );
}

export default Dashboard;
