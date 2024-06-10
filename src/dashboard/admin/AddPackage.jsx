import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";

const AddPackage = () => {
    const axiosSecure = useAxiosSecure();
    const [duration, setDuration] = useState("Select tour duration");
    const [durationError, setDurationError] = useState("");
    const [loadingOpen, setLoadingOpen] = useState(false);
    const imgbb_key = import.meta.env.VITE_IMGBB_KEY;
    const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            tourType: "Choose Type",
        }
    });

    const renderInputFields = (duration) => {
        if (duration == 3 || duration == 5 || duration == 7) {
            const length = parseInt(duration);
            return (
                <>
                    {Array.from({ length: length }, (_, idx) => (
                        <div key={idx} className="form-control">
                            <label className="label">
                                <span className="label-text">Day { idx + 1 } plan</span>
                            </label>
                            <input type="text" className="input input-bordered" {...register(`day${ idx + 1 }`, { required: 'Plan is required' })} />
                            <p className="text-red-500 mt-2">{errors[`day${ idx + 1 }`]?.message}</p>
                        </div>
                    ))}
                </>
            );
        }
        return null;
    };

    const onSubmit = async (data) => {
        if (!(duration == 3 || duration == 5 || duration == 7)) {
            setDurationError("Duration is required");
            return;
        }
        setLoadingOpen(true);
        let newData = {
            tourPlan: {},
            about: data.about,
            price: data.price,
            tourType: data.tourType,
            tripTitle: data.tripTitle
        };
        const coverImage = { image: data.coverImage[0]};
        const subImage = { image: data.subImage[0]};

        for (const key in data) {
            if (key.startsWith("day")) {
                newData.tourPlan[key] = data[key];
            }
        }
        
        const result_1 = await axios.post(imgbb_url, coverImage, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (result_1.data.data.display_url) {
            newData.coverImage = result_1.data.data.display_url;
        } else {
            setLoadingOpen(false);
            swal("Adding package failed!", {
                icon: "warning",
            });
            return;
        }

        const result_2 = await axios.post(imgbb_url, subImage, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (result_2.data.data.display_url) {
            newData.subImage = result_2.data.data.display_url;
        } else {
            setLoadingOpen(false);
            swal("Adding package failed!", {
                icon: "warning",
            });
            return;
        }

        const res = await axiosSecure.post('/package', newData);
        if (res.data.insertedId) {
            setLoadingOpen(false);
            reset();
            swal("Added package successfully!", {
                icon: "success",
            });
        } else {
            setLoadingOpen(false);
            swal("Adding package failed!", {
                icon: "warning",
            });
        }
    };
    return (
        <div className='my-10'>
            <Helmet>
                <title>Add package</title>
            </Helmet>
            <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>Add a Tour Package</h2>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Package Name</span>
                    </label>
                    <input type="text" className="input input-bordered" {...register("tripTitle", { required: 'Package name is required' })} />
                    <p className="text-red-500 mt-2">{errors.tripTitle?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tour Type</span>
                    </label>
                    <select className="select input-bordered" {...register("tourType", { required: 'Tour type is required' })}>
                        <option>Cultural Heritage</option>
                        <option>Adventure and Hiking</option>
                        <option>Wildlife and Nature</option>
                        <option>Beach and Relaxation</option>
                        <option>Culinary and Wine</option>
                    </select>
                    <p className="text-red-500 mt-2">{errors.tourType?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input type="text" className="input input-bordered" {...register("price", { required: 'Price is required' })} />
                    <p className="text-red-500 mt-2">{errors.price?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">About</span>
                    </label>
                    <input type="text" className="input input-bordered" {...register("about", { required: 'About is required' })} />
                    <p className="text-red-500 mt-2">{errors.about?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Cover Image</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("coverImage", { required: 'Cover Image is required' })} />
                    <p className="text-red-500 mt-2">{errors.coverImage?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Sub Image</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("subImage", { required: 'Sub Image is required' })} />
                    <p className="text-red-500 mt-2">{errors.subImage?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tour Duration (Days)</span>
                    </label>
                    <select value={duration} onChange={(e) => {
                        setDuration(e.target.value);
                        setDurationError('');
                        }} className="select select-bordered" required={true}>
                        <option disabled>Select tour duration</option>
                        <option>3</option>
                        <option>5</option>
                        <option>7</option>
                    </select>
                    <p className="text-red-500 mt-2">{ durationError }</p>
                </div>
                {renderInputFields(duration)}
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-[#F2613F] text-white">Add Package</button>
                </div>
            </form>

            <input type="checkbox" checked={loadingOpen} id="my_modal_6" className="modal-toggle" readOnly />
            <div className="modal" role="dialog">
                <div className="modal-box flex justify-center">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            </div>
        </div>
    );
};

export default AddPackage;