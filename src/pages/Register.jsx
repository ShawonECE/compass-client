import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../components/AuthProvider";
import { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import swal from 'sweetalert';
import registerImg from '../assets/signup.png';

const Register = () => {
    const {createUser, updateInfo, user, logOutUser} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const {name, email, password, photoURL} = data;
        const extraInfo = {
            displayName: name,
            photoURL: photoURL
        };
        createUser(email, password)
            .then(() => {
                updateInfo(extraInfo)
            })
            .then(() => {
                logOutUser();
                swal("Registered successfully!", {
                    icon: "success",
                });
                navigate('/login', {state: {from: '/register', to: location.state ? location.state : null}});
            })
            .catch(error => {
                console.error(error);
                swal("Registration Failed!", {
                    icon: "warning",
                });
            });
    };
    return (
        <div className="hero min-h-screen bg-[#F2613F] bg-opacity-10 mt-10 rounded-2xl">
            <Helmet>
                <title>JobQuest | Register</title>
            </Helmet>
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <img src={registerImg} alt="" className="w-full"/>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-[#222831]">
                    <h2 className="text-center text-3xl font-bold mt-5 dark:text-[#E7F6F2]">Register Here</h2>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Name</span>
                            </label>
                            <input type="text" placeholder="Enter your name" className="input input-bordered dark:text-white dark:bg-gray-700" {...register("name", { 
                                required: 'Name is required',
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message: "Name can't contain digits or special characters"
                                } })} />
                            <p className="text-red-500 mt-2">{errors.name?.message}</p>
                        </div>
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text dark:text-white">Photo URL</span>
                            </label>
                            <input type="url" placeholder="Enter your photo url" className="input input-bordered dark:text-white dark:bg-gray-700" {...register("photoURL", { required: 'Photo URL is required' })} />
                            <p className="text-red-500 mt-2">{errors.photoURL?.message}</p>
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text dark:text-white">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" className="input input-bordered dark:text-white dark:bg-gray-700" {...register("password", {
                                required: 'Password is required', 
                                pattern: {
                                    value: /(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                                    message: 'Password must include 1 uppercase and 1 lowercase letter and be 6+ characters long',
                                }
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
                            <button type="submit" className="btn bg-[#0C0C0C] text-[#F2613F] border-x-0 border-t-0 border-b-2 border-b-[#F2613F] rounded-md" disabled={user}>Register</button>
                        </div>
                        <p className="text-center">
                            <Link to='/login' className="label-text-alt link link-hover dark:text-white">Already have an account?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;