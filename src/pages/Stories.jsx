import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "../components/SectionTitle";
import StoryCard from "../components/StoryCard";

const Stories = () => {
    const axiosPublic = useAxiosPublic();

    const { isPending, data } = useQuery({ queryKey: ['stories'], queryFn: async() => {
        const data = await axiosPublic.get('/stories');
        return data.data;
    } });

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
            </div>
        )
    }
    return (
        <div className="mt-5">
            <SectionTitle text="Discover Our Offerings and Team" marginTop={10}></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {
                    data.map(story => <StoryCard key={story._id} story={story}></StoryCard>)
                }
            </div>
        </div>
    );
};

export default Stories;