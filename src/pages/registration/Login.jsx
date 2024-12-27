import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
    const context = useContext(myContext)
    const {loading, setLoading} = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
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

    const contsctForPassRecovery = () =>{
        toast.info("contact on wa for password recovery")
    }
   
    return (
       <section className='lg:grid lg:grid-cols-2 '>
        <div className="lg:block hidden">
            <img src="/bg.jpg" alt="" className='object-cover w-full h-screen rounded-r-3xl' />
        </div>

        <div className="flex justify-center items-center h-screen   ">
            {loading && <Loader />}
            <div className="bg-white px-10 py-10 rounded-xl  max-w-sm w-full">
                <div className="mb-4 text-center items-center ">
                    <h1 className="text-center text-5xl font-bold text-blue-600">Login</h1>
                    <p>Login with your details</p>
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        className="bg-blue-100 mb-4 px-4 py-2 w-full h-[50px] rounded-xl  text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-blue-100 mb-4 px-4 py-2 w-full h-[50px] rounded-xl  text-gray-800 placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Password"
                    />
                    
                </div>
                <p className='text-end -mt-7 mb-5 text-sm text-blue-600 hover:underline ' >
                    <button onClick={()=>contsctForPassRecovery()}>Forgot password</button>
                </p>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={login}
                        className="bg-blue-600 text-white font-bold w-full px-4 py-2 rounded-2xl shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
                    >
                        Login
                    </button>
                </div>
                <div className="text-center">
                    <h2 className="text-gray-700">
                        Don't have an account?{' '}
                        <Link className="text-blue-600 font-bold hover:underline" to={'/signup'}>
                            Signup
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
       </section>

    )
}

export default Login