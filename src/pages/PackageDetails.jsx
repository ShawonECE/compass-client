import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import useGuides from "../hooks/useGuides";
import moment from "moment";

const PackageDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    let days = [];

    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            guide: "Choose Guide",
        }
    });
    const today = moment().format("YYYY-MM-DD");

    const { isPending, data = {} } = useQuery({ queryKey: [`package_${id}`], queryFn: async() => {
        const data = await axiosPublic.get(`/package/${id}`);
        return data.data;
    } });

    const { isPending: guidesPending, data: guides } = useGuides();

    const {coverImage, subImage, tourType, tripTitle, price, about, tourPlan, _id} = data;

    const handleBookingModal = () => {
        if (!user) {
            swal("You have to log in before booking!", {
                icon: "warning",
            });
        } else {
            setModalOpen(true);
        }
    };

    const onSubmit = (data) => {
        const guideName = data.guide.split(" (")[0];
        const guideId = data.guide.split(":")[1].split(")")[0];
        const newData = { package: tripTitle, packageId: _id, touristName: user.displayName, email: user.email, image: user.photoURL, guideName, guideId, price: price, date: data.date };
        axiosPublic.post('/booking', newData)
        .then(data => {
            if (data.data.insertedId) {
                setModalOpen(false);
                reset();
                swal("Booked successfully!", {
                    icon: "success",
                });
            } else {
                swal("Booking failed!", {
                    icon: "warning",
                });
            }
        });
    };

    if (isPending || guidesPending) {
        return (
            <>
                <div className="skeleton h-12 mt-10 mb-5"></div>
                <div className="skeleton h-48"></div>
            </>
        )
    } else {
        days = Object.keys(tourPlan);
    }

    return (
        <div className="mt-6">
            <Helmet>
                <title>Package Details</title>
            </Helmet>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">{tripTitle} ({tourType})</h1>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">$<span className="text-[#F2613F]">{price}</span></h1>
                </div>
                <button onClick={handleBookingModal} className="btn bg-[#0C0C0C] text-[#F2613F] border-x-0 border-t-0 border-b-2 border-b-[#F2613F] rounded-md">Book Now</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
                <img src={coverImage} alt="" className="w-full rounded-md" />
                <img src={subImage} alt="" className="w-full rounded-md" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Description</h2>
            <p className="text-lg mt-3 text-justify">{ about }</p>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Tour Plan</h2>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {
                    days.map((day, idx) => 
                        <li key={idx}>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F2613F" className="h-5 w-5">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className={`mb-10 ${idx % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'}`}>
                                <div className="text-lg font-bold">Day {idx + 1}</div>
                                { tourPlan[day] }
                            </div>
                            <hr />
                        </li>
                    )
                }
            </ul>

            {/* booking modal */}
            <input type="checkbox" checked={modalOpen} id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <form method="dialog">
                        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Package Name</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={ tripTitle } disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tourist Name</span>
                            </label>
                            <input type="text" className="input input-bordered" defaultValue={ user?.displayName } disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" className="input input-bordered" defaultValue={ user?.email } disabled />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input type="url" className="input input-bordered" defaultValue={ user?.photoURL } disabled/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" className="input input-bordered" defaultValue={ price } disabled/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" min={today} className="input input-bordered" {...register("date", { required: 'Tour date is required' })} />
                            <p className="text-red-500 mt-2">{errors.date?.message}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Select Guide</span>
                            </label>
                            <select className="select input-bordered" {...register("guide", { required: 'Guide Name is required' })}>
                                {
                                    guides.map(guide => <option key={guide._id}>{ guide.name } (id:{ guide._id })</option>)
                                }
                            </select>
                            <p className="text-red-500 mt-2">{errors.guide?.message}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-[#F2613F] text-white">Confirm Booking</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;