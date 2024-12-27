import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { Loader } from 'lucide-react';

function ProductInfo() {
    const context = useContext(myContext);
    const [isLoading, setLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const params = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, 'products', params.id));
            setProducts(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData(); // Fetch product data on mount
    }, [params.id]);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const addCart = (product) => {
        const updatedProduct = { ...product, quantity };
        dispatch(addToCart(updatedProduct));
        toast.success(`${quantity} ${product.title} added to cart!`);
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Increase/Decrease quantity for normal purchase
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    return (
        <Layout>
            {isLoading ? (
                <div className='items-center justify-center flex'>
                    <Loader className='w-[50px] h-[50px] mt-6 text-blue-700 animate-spin' />
                    <p className="text-2xl font-bold flex"> 
                    {/* <img src="loder.gif" alt="loading" className="mx-auto mt-20 h-[100px] " /> */}
                        {/* <Loader className='animate-spin h-9 w-9 text-blue-600'/>  */}
                        
                    </p>
                </div>
            ) : (
                <section className="text-gray-600 body-font overflow-hidden py-5 px-5">
                    <div className="container px-5 py-10 m-auto border rounded-2xl shadow-lg bg-white">
                        {products && (
                            <div className="lg:w-[1200px] mx-auto flex flex-wrap">
                                <img
                                    alt="ecommerce"
                                    className="lg:w-[450px] w-full lg:h-auto object-contain object-center rounded-lg shadow-md"
                                    src={products.imageUrl}
                                />
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">Top Product</h2>
                                    <h1 className="text-gray-900 text-3xl title-font mb-1 font-semibold">
                                        {products.title}
                                    </h1>
                                    <p className="leading-relaxed border-b-2 mb-5 pb-5 text-justify">
                                        {products.description}
                                    </p>
                                    {/* <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                        Min. Wholesale Quantity: {products.WholesaleQuantity} Kg <br />
                                        Wholesale Rate: ₹{products.WholesaleRate} per Kg <br />
                                        Retail Rate: ₹{products.RetailRate} <br />
                                        GST: {products.GST} %
                                    </p> */}

                                    <div className="flex items-center mb-4">
                                        <span className="text-xl text-gray-900 font-semibold">
                                            ₹ {products.price}
                                        </span>
                                        <div className="ml-6 flex items-center space-x-2">
                                            <button
                                                onClick={decreaseQuantity}
                                                className="text-white bg-gray-400 hover:bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                className="w-16 p-2 border rounded-md text-center"
                                                value={quantity}
                                                readOnly
                                            />
                                            <button
                                                onClick={increaseQuantity}
                                                className="text-white bg-gray-400 hover:bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => addCart(products)}
                                        className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 py-3 px-6 rounded-3xl mt-5 transition-all"
                                    >
                                        Add {quantity} to Cart
                                    </button>
                                </div>

                                <div>
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </Layout>
    );
}

export default ProductInfo;
