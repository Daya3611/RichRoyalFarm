import React, { useContext, useState, useEffect } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { CrossIcon } from 'lucide-react';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, order } = context;
  const [isLoading, setLoading] = useState(true);  // Set initial loading state to true

  // Simulate loading state update after data is fetched (can be replaced with real API call or context change)
  useEffect(() => {
    if (order) {
      setLoading(false);  // Set loading to false when orders are loaded
    }
  }, [order]);  // Trigger when order context changes

  const hasOrders = order && order.length > 0 && order.some((o) => o.userid === userid);

  return (
    <Layout>
      {isLoading ? (
        <div>
          <Loader /> {/* Replace with your actual loading component */}
        </div>
      ) : hasOrders ? (
        <div className="h-full pt-10 rounded-3xl">
          {order
            .filter((obj) => obj.userid === userid)  // Filter orders for the current user
            .map((orderItem) => {
              const itemQuantities = {};
              orderItem.cartItems.forEach((item) => {
                if (itemQuantities[item.id]) {
                  itemQuantities[item.id].quantity += 1;
                } else {
                  itemQuantities[item.id] = { ...item, quantity: 1 };
                }
              });
              const uniqueItems = Object.values(itemQuantities);

              return (
                <div key={orderItem.id} className="rounded-3xl mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 items-center flex gap-4 mt-4">
                  {uniqueItems.map((item) => (
                    <div key={item.id} className="rounded-3xl md:w-2/3 flex items-center">
                      <div className="justify-between mb-6 rounded-3xl bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {item.title}
                            </h2>
                            <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {item.description.slice(0, 50)}.....
                            </p>
                            <p className="mt-1 text-xl text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {item.price}
                            </p>
                            <p className="mt-2 text-md text-gray-500" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[150px] p-6">
          <CrossIcon className="w-16 h-16 text-red-600 mb-6 rotate-45" />
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Not Ordered
          </h2>
          <p className="text-lg text-gray-600">
            Looks like you haven't placed an order yet. Explore our items and shop now!
          </p>
        </div>
      )}
    </Layout>
  );
}

export default Order;
