import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import FeedbackCard from "../components/FeedbackCard";

const GuideDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { isPending, data={} } = useQuery({ queryKey: [`guide_${id}`], queryFn: async() => {
        const data = await axiosPublic.get(`/guide/${id}`);
        return data.data;
    } });

    const { name, image, email, education, skills, workExperience, feedback } = data;
    let rating = 0;

    if (isPending) {
        return (
            <div className="flex flex-col gap-4 mt-5">
                <div className="flex gap-4 md:gap-8 lg:gap-12 items-center">
                    <div className="skeleton w-52 md:w-72 lg:w-96 h-52 md:h-72 lg:h-96 rounded-full shrink-0"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton w-52 md:w-72 lg:w-96 h-8"></div>
                        <div className="skeleton w-52 md:w-72 lg:w-96 h-8"></div>
                    </div>
                </div>
                <div className="skeleton h-64 md:h-72 lg:h-96 w-full"></div>
            </div>
        )
    } else {
        rating = Math.round((feedback.reduce((acc, curr) => acc + curr.rating, 0)) / feedback.length);
    }

    return (
        <div className="mt-5">
            <Helmet>
                <title>Guide Details</title>
            </Helmet>
            <div className="grid grid-cols-8 gap-2 md:gap-12 bg-[#F2613F] bg-opacity-10 rounded-xl">
                <div className="col-span-3 p-4 md:p-6 lg:p-10">
                    <img src={image} alt="" className="w-full rounded-full" />
                </div>
                <div className="col-span-5 my-auto">
                    <h3 className="text-2xl font-bold text-[#F2613F]">{ name }</h3>
                    <p className="font-semibold">{ email }</p>
                    <div className="rating mt-2">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 1} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 2} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 3} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 4} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" disabled checked={rating === 5} />
                    </div>
                    <button className="btn bg-[#0C0C0C] text-[#F2613F] border-x-0 border-t-0 border-b-2 border-b-[#F2613F] rounded-md btn-sm block mt-2">Rate</button>
                </div>
            </div>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Education</h2>
            <p className="text-lg mt-3 text-justify">{ education }</p>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Skills</h2>
            <ul className="list-disc pl-8 flex flex-wrap gap-10 mt-3">
                {
                    skills.map((skill, idx) => <li key={idx}>{ skill }</li>)
                }
            </ul>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Work Experience</h2>
            <p className="text-lg mt-3 text-justify">{ workExperience }</p>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Tourist Feedback</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-8">
                {
                    feedback.map((review, idx) => <FeedbackCard key={idx} feedback={review}></FeedbackCard>)
                }
            </div>
        </div>
    );
};

export default GuideDetails;