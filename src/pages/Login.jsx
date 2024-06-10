import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import swal from 'sweetalert';
import loginImg from '../assets/login.png';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { signInWithGoogle, signInUser, setLoading, user } = useContext(AuthContext);
    const onSubmit = (data) => {
        const { email, password } = data;
        signInUser(email, password)
            .then(() => {
                swal("Logged In successfully!", {
                    icon: "success",
                });
                if (location?.state?.to) {
                    navigate(location.state.to);
                } else {
                    navigate('/');
                }
            })
            .catch(error => {
                setLoading(false);
                console.error(error);
                swal("Log In Failed!", {
                    icon: "warning",
                });
            });
    };
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(() => {
            swal("Logged In successfully!", {
                icon: "success",
            });
            if (location?.state?.to) {
                navigate(location.state.to);
            } else {
                navigate('/');
            }
        })
        .catch(error => {
            setLoading(false);
            console.error(error);
            swal("Log In Failed!", {
                icon: "warning",
            });
        })
    };
    return (
        <div className="hero min-h-screen bg-[#F2613F] bg-opacity-10 mt-10 rounded-2xl">
            <Helmet>
                <title>Compass | Log In</title>
            </Helmet>
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <img src={loginImg} alt="" className="w-full"/>
                </div>
                <div className="card shrink-0 w-full max-w-sm bg-base-100 shadow-2xl dark:bg-[#222831]">
                    <h2 className="text-center text-3xl font-bold mt-5 dark:text-[#E7F6F2]">Login Here</h2>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {
                            location.state?.from === '/register' &&
                            <h2 className="text-center text-lg font-semibold text-green-400">You are registered. Now please log in</h2>
                        }
                        {
                            location.state?.from !== '/register' && location.state?.to &&
                            <h2 className="text-center text-lg font-semibold text-green-400">Please Login to get all access</h2>
                        }
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Email</span>
                            </label>
                            <input type="email" placeholder="Enter your email" className="input input-bordered dark:text-white dark:bg-gray-700" {...register("email", { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                                    message: 'Please enter a valid email address'
                                } })} />
                            <p className="text-red-500 mt-2">{errors.email?.message}</p>
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text dark:text-white">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" className="input input-bordered dark:text-white dark:bg-gray-700" {...register("password", {
                                required: 'Password is required', 
                            })} />
                            {
                                showPassword ? 
                                <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-6 cursor-pointer text-lg dark:text-white" />
                                :
                                <FaRegEye onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-6 cursor-pointer text-lg dark:text-white" />
                            }
                            <p className="text-red-500 mt-2">{errors.password?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-[#0C0C0C] text-[#F2613F] border-x-0 border-t-0 border-b-2 border-b-[#F2613F] rounded-md" disabled={user}>Log in</button>
                        </div>                        
                    </form>
                    <div className="divider px-8 -mt-2">Or</div>
                    <div className="flex justify-center">
                        <button onClick={handleGoogleSignIn} className="btn btn-circle" disabled={user}>
                            <FaGoogle className="text-lg text-[#F2613F]"/>
                        </button>
                    </div>
                    <p className="text-center mb-8 mt-1">
                        <Link to='/register' state={location.state?.to} className="label-text-alt link link-hover dark:text-white">Don&apos;t have an account? Register now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;