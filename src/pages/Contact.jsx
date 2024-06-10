import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import useAxiosPublic from "../hooks/useAxiosPublic";
import swal from "sweetalert";

const Contact = () => {
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        axiosPublic.post('/message', data)
        .then(res => {
            if (res.data.insertedId) {
                reset();
                swal("Messaged successfully!", {
                    icon: "success",
                });
            } else {
                swal("Messaging Failed!", {
                    icon: "warning",
                });
            }
        })
        .catch(error => {
            console.log(error);
            swal("Messaging Failed!", {
                icon: "warning",
            });
        });
    };

    return (
        <div className="hero min-h-screen bg-[#F2613F] bg-opacity-10 mt-10 rounded-2xl">
            <Helmet>
                <title>Compass | Contact Us</title>
            </Helmet>
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                <div>
                    <div className="flex gap-2 items-center mb-2">
                        <IoLocationSharp className="text-3xl" />
                        <h3 className="text-lg">House No. 12, Road No. 7, Sector 3, Uttara, Dhaka 1230, Bangladesh</h3>
                    </div>
                    <div className="flex gap-2 items-center mb-2">
                        <IoIosMail className="text-2xl"/>
                        <h4 className="text-lg"><span className="text-semibold">Email: </span>compass@travels.com</h4>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FaPhoneAlt className="text-xl"/>
                        <h4 className="text-lg"><span className="text-semibold">Phone: 1243564383</span></h4>
                    </div>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h2 className="text-center text-3xl font-bold mt-5">Leave message Here</h2>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Enter your name" className="input input-bordered" {...register("name", { 
                                required: 'Name is required',
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message: "Name can't contain digits or special characters"
                                } })} />
                            <p className="text-red-500 mt-2">{errors.name?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Enter your email" className="input input-bordered" {...register("email", { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,
                                    message: 'Please enter a valid email address'
                                } })} />
                            <p className="text-red-500 mt-2">{errors.email?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Message</span>
                            </label>
                            <textarea type="text" placeholder="Enter your message" className="textarea textarea-bordered" {...register("message", { required: 'Message is required' })} />
                            <p className="text-red-500 mt-2">{errors.message?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-[#0C0C0C] text-[#F2613F] border-x-0 border-t-0 border-b-2 border-b-[#F2613F] rounded-md">Send message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;