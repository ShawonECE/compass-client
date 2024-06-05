import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const StoryDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { isPending, data = {} } = useQuery({ queryKey: [`story_${id}`], queryFn: async() => {
        const data = await axiosPublic.get(`/story/${id}`);
        return data.data;
    } });

    const {touristName, image1, image2,  tourLocation, story} = data;

    if (isPending) {
        return (
            <>
                <div className="skeleton h-12 mt-10 mb-5"></div>
                <div className="skeleton h-48"></div>
            </>
        )
    }

    return (
        <div className="mt-6">
            <Helmet>
                <title>Story Details</title>
            </Helmet>
            <div className="flex justify-between">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">{touristName} was in {tourLocation}</h1>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">By: <span className="text-[#F2613F]">{touristName}</span></h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
                <img src={image1} alt="" className="w-full rounded-md" />
                <img src={image2} alt="" className="w-full rounded-md" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Story</h2>
            <p className="text-lg mt-3 text-justify">{story}</p>
        </div>
    );
};

export default StoryDetails;