import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPublic } from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const PackageDetails = () => {
    const { id } = useParams();
    let days = [];

    const { isPending, data = {} } = useQuery({ queryKey: [`package_${id}`], queryFn: async() => {
        const data = await axiosPublic.get(`/package/${id}`);
        return data.data;
    } });

    const {coverImage, subImage, tourType, tripTitle, price, about, tourPlan} = data;

    if (isPending) {
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
                <h1 className="text-3xl font-semibold">{tripTitle} ({tourType})</h1>
                <h1 className="text-3xl font-bold">$<span className="text-[#F2613F]">{price}</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
                <img src={coverImage} alt="" className="w-full rounded-md" />
                <img src={subImage} alt="" className="w-full rounded-md" />
            </div>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Description</h2>
            <p className="text-lg mt-3 text-justify">{ about }</p>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Tour Plan</h2>
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
        </div>
    );
};

export default PackageDetails;