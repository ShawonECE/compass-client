import { useForm } from "react-hook-form";
import { AuthContext } from "../../components/AuthProvider";
import { useContext, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import useAxiosPublic from './../../hooks/useAxiosPublic';

const AddStory = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const imgbb_key = import.meta.env.VITE_IMGBB_KEY;
    const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setModalOpen(true);
        const newData = {
            touristName: user.displayName,
            tourLocation: data.tourLocation,
            story: data.story
        };

        const img1 = { image: data.image1[0]};
        const img2 = { image: data.image2[0]};

        const result_1 = await axios.post(imgbb_url, img1, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (result_1.data.data.display_url) {
            newData.image1 = result_1.data.data.display_url;
        } else {
            setModalOpen(false);
            swal("Adding story failed!", {
                icon: "warning",
            });
            return;
        }

        const result_2 = await axios.post(imgbb_url, img2, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (result_2.data.data.display_url) {
            newData.image2 = result_2.data.data.display_url;
        } else {
            setModalOpen(false);
            swal("Adding story failed!", {
                icon: "warning",
            });
            return;
        }

        const res = await axiosPublic.post('/story', newData);
        if (res.data.insertedId) {
            setModalOpen(false);
            reset();
            swal("Added story successfully!", {
                icon: "success",
            });
        } else {
            setModalOpen(false);
            swal("Adding story failed!", {
                icon: "warning",
            });
        }
    };
    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h2 className="text-center text-3xl font-bold mt-5">Add Your Story</h2>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tourist Name</span>
                    </label>
                    <input type="text" className="input input-bordered" defaultValue={user?.displayName} disabled />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Tour Location</span>
                    </label>
                    <input type="text" className="input input-bordered" {...register("tourLocation", { required: 'Tour location is required' })} />
                    <p className="text-red-500 mt-2">{errors.tourLocation?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image 1</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("image1", { required: 'Image is required' })} />
                    <p className="text-red-500 mt-2">{errors.image1?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Image 2</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("image2", { required: 'Image is required' })} />
                    <p className="text-red-500 mt-2">{errors.image2?.message}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Story</span>
                    </label>
                    <textarea type="text" className="textarea textarea-bordered" {...register("story", { required: 'Story is required' })} />
                    <p className="text-red-500 mt-2">{errors.story?.message}</p>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn bg-[#0C0C0C] text-[#F2613F] border-x-0 border-t-0 border-b-2 border-b-[#F2613F] rounded-md">Add Story</button>
                </div>
            </form>

            <input type="checkbox" checked={modalOpen} id="my_modal_6" className="modal-toggle" readOnly />
            <div className="modal" role="dialog">
                <div className="modal-box flex justify-center">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            </div>
        </div>
    );
};

export default AddStory;