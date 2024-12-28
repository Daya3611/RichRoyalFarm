import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, updateQuantity } from '../../redux/cartSlice'; // Ensure updateQuantity action is defined
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { CheckCheckIcon } from 'lucide-react';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const auth = getAuth();
  const loginUser = auth.currentUser;

  // Redirect to login if user is not authenticated
  if (!loginUser) {
    return <Navigate to="/login" />;
  }

  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart");
  };

  const updateItemQuantity = (item, quantity) => {
    if (quantity < 1) return; // Ensure quantity is at least 1
    dispatch(updateQuantity({ ...item, quantity }));
    toast.success(`Updated quantity for ${item.title} to ${quantity}`);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += (cartItem.price * cartItem.quantity); // Update for item quantity
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = 100; // Shipping Charges
  const GST = totalAmount * 0.06;
  const grandTotal = shipping + totalAmount + GST;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online");

  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required");
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      email: JSON.parse(localStorage.getItem("user")).user.email,
      userid: JSON.parse(localStorage.getItem("user")).user.uid,
      paymentId: paymentMethod === "cod" ? "COD" : undefined,
    };

    try {
      if (paymentMethod === "online") {
        const options = {
          key: "rzp_test_8j0mz5Li56hWpj", // Test key
          amount: parseInt(grandTotal * 100),
          currency: "INR",
          order_receipt: 'order_rcptid_' + name,
          name: "Rich Royal Farm",
          description: "For Shopping Order",
          handler: async function (response) {
            toast.success('Payment Successful');
            const paymentId = response.razorpay_payment_id;
            orderInfo.paymentId = paymentId;

            try {
              const orderRef = collection(fireDB, 'order');
              await addDoc(orderRef, orderInfo);
              sendWhatsAppMessage(name, paymentId, grandTotal, addressInfo.date, phoneNumber, cartItems);
            } catch (error) {
              toast.error('Failed to process the order');
            }
          },
          theme: {
            color: "#3399cc",
          },
        };

        var pay = new window.Razorpay(options);
        pay.open();
      } else {
        const orderRef = collection(fireDB, 'order');
        await addDoc(orderRef, orderInfo);
        sendWhatsAppMessage(name, "COD", grandTotal, addressInfo.date, phoneNumber, cartItems);
      }
    } catch (error) {
      toast.error('Failed to process the order by COD');
    }
  };

  const sendWhatsAppMessage = (name, paymentId, amount, date, phoneNumber, cartItems) => {
    const message = `Order Details:
      Name: ${name}
      Payment ID: ${paymentId}
      Amount: ₹${amount}
      Date: ${date}
      Phone Number: ${phoneNumber}
      cart items: ${cartItems.map((item) => `${item.title} (x${item.quantity})`).join(", ")}
    `;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumberWithCountryCode = `919326928336`; 
    const url = `https://wa.me/${phoneNumberWithCountryCode}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <Layout>
      <div className="h-[130%] bg-gray-100 pt-5">
        <h1 className="mb-10 text-center text-3xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-3xl md:w-2/3 h-[500px] overflow-auto">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl, quantity } = item;
              const totalItemPrice = price * quantity;
              return (
                <div
                className="flex flex-col md:flex-row justify-between mb-6 p-6 rounded-3xl border bg-white"
                style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}
              >
                <div className="flex gap-4 items-center max-w-[400px]">
                  <img src={imageUrl} alt="product" className="w-[120px] h-[120px] object-fit rounded-lg" />
                  <div>
                    <h2 className="text-md font-bold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-600">{description.slice(0, 30)}...</p>
                  </div>
                </div>

                <div className="mt-4 ml-5 md:mt-0 flex text-center items-center gap-4">
                  <p className="text-xl font-semibold text-gray-700 mr-2">₹{totalItemPrice}</p>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateItemQuantity(item, quantity - 1)}
                      className="text-white bg-gray-400 hover:bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      className="w-16 p-2 border rounded-md text-center"
                      value={quantity}
                      onChange={(e) => updateItemQuantity(item, parseInt(e.target.value))}
                    />
                    <button
                      onClick={() => updateItemQuantity(item, quantity + 1)}
                      className="text-white bg-gray-400 hover:bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Item */}
                  <div
                    onClick={() => deleteCart(item)}
                    className="text-red-600  md:mt-0 cursor-pointer flex items-center "
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          <div className="mt-6 h-full border bg-white p-6 shadow-md md:mt-0 md:w-1/3 rounded-3xl">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">₹{totalAmount}</p>
            </div>
            <div className="mb-1 flex justify-between">
              <p className="text-gray-700">GST 6 %</p>
              <p className="text-gray-700">₹{GST.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold">Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold">₹{grandTotal}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <span className="ml-2">Online Payment</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="ml-2">Cash on Delivery (COD)</span>
              </label>
            </div>

            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
              isCOD={paymentMethod === "cod"}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
