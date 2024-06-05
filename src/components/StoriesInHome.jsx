import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "./SectionTitle";
import StoryCard from "./StoryCard";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const StoriesInHome = () => {
    const axiosPublic = useAxiosPublic();

    const { isPending, data } = useQuery({ queryKey: ['4stories'], queryFn: async() => {
        const data = await axiosPublic.get('/stories?limit=4');
        return data.data;
    } });

    const navigate = useNavigate();

    if (isPending) {
        return (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
            </div>
        )
    }

    return (
        <div>
            <SectionTitle text="Tour Stories" marginTop={16}></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {
                    data.map(story => <StoryCard key={story._id} story={story}></StoryCard>)
                }
            </div>
            <div className="flex justify-center mt-5">
                <Button text='All Stories' click={() => navigate('/stories')}></Button>
            </div>
        </div>
    );
};

export default StoriesInHome;