import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SectionTitle from "../components/SectionTitle";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
    const axiosPublic = useAxiosPublic();

    const { isPending, data } = useQuery({ queryKey: ['blogs'], queryFn: async() => {
        const data = await axiosPublic.get('/blogs');
        return data.data;
    } });

    if (isPending) {
        return (
            <div className="my-5">
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
                <div className="skeleton h-48"></div>
            </div>
        )
    }

    return (
        <div className="mt-5">
            <SectionTitle text="Read blogs about tourism" marginTop={10}></SectionTitle>
            <div className="grid grid-cols-1 gap-6 mt-10">
                {
                    data.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default Blogs;