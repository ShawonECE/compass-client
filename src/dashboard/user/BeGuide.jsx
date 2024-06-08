import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BeGuide = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { isPending, data, refetch } = useQuery({ queryKey: [`guide_req_${user.email}`], queryFn: async() => {
        const data = await axiosSecure.get(`/guide-request?email=${user.email}`);
        return data.data;
    } });
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        const { education, skills, workExperience } = data;
        const skillArray = skills.split(',');
        const newSkills = skillArray.map(skill => skill.trim());
        const newData = {
            name: user.displayName,
            image: user.photoURL,
            email: user.email,
            education,
            workExperience,
            feedback: [],
            skills: newSkills
        };
        
        axiosPublic.post('/guide-request', newData)
        .then(res => {
            if (res.data.insertedId) {
                refetch();
                reset();
                swal("Request submitted!", {
                    icon: "success",
                });
            } else {
                swal("Request failed!", {
                    icon: "warning",
                });
            }
        });
    };

    if (isPending) {
        return (
            <div className="skeleton h-48 m-10"></div>
        )
    }

    return (
        <div className='my-10'>
            {
                data.requested && <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>Your request is submitted. Please wait for the confirmation.</h2>

            }
            {
                !data.requested &&
                <>
                    <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>Request to admin to be a guide</h2>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={user.displayName} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={user?.email} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input type="url" className="input input-bordered" defaultValue={user?.photoURL} disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <input type="text" className="input input-bordered" {...register("education", { required: 'Educational qualification is required' })} />
                            <p className="text-red-500 mt-2">{errors.education?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Skills</span>
                            </label>
                            <input type="text" placeholder="Like: skill1, skill2, skill3..." className="input input-bordered" {...register("skills", { required: 'Skills is required' })} />
                            <p className="text-red-500 mt-2">{errors.skills?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Work Experience</span>
                            </label>
                            <input type="text" className="input input-bordered" {...register("workExperience", { required: 'Work Experience is required' })} />
                            <p className="text-red-500 mt-2">{errors.workExperience?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-[#F2613F] text-white">Submit Request</button>
                        </div>
                    </form>
                </>
            }
        </div>
    );
};

export default BeGuide;