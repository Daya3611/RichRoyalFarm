import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signup = async () => {
        setLoading(true)
        if (name === "" && email === "" && password === "") {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            // console.log(users)

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time : Timestamp.now()
            }
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            toast.success("Signup Succesfully")
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }

    return (
        <section className='lg:grid lg:grid-cols-2'>
            <div className="lg:block hidden">
                <img src="/bg.jpg" alt="" className='object-cover w-full h-screen rounded-r-3xl' />
            </div>

            <div className="flex justify-center items-center h-screen ">
            {loading && <Loader />}
            <div className="bg-white px-10 py-10 rounded-3xl  max-w-sm w-full">
                <div className="mb-4 text-center items-center ">
                    <h1 className="text-center text-5xl font-bold text-blue-600">Signup</h1>
                    <p>Signup with your details</p>
                </div>
                <div className="mb-1">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        className="bg-blue-100 mb-4 px-4 py-2 w-full h-[50px] rounded-xl  text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Name"
                    />
                </div>
                <div className="mb-1">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        className="bg-blue-100 mb-4 px-4 py-2 w-full h-[50px] rounded-xl  text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-blue-100 mb-4 px-4 py-2 w-full h-[50px] rounded-xl  text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Password"
                    />
                </div>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={signup}
                        className="bg-blue-600 text-white font-bold w-full px-4 py-2 h-[40px] rounded-2xl shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
                    >
                        Signup
                    </button>
                </div>
                <div className="text-center">
                    <h2 className="text-gray-700">
                        Have an account?{' '}
                        <Link className="text-blue-600 font-bold hover:underline" to={'/login'}>
                            Login
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
        </section>

    )
}

export default Signup