import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const BlogDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { isPending, data } = useQuery({ queryKey: [`blog_${id}`], queryFn: async() => {
        const data = await axiosPublic.get(`/blog/${id}`);
        return data.data;
    } });

    if (isPending) {
        return (
            <div className="skeleton h-48 mt-6"></div>
        )
    }

    return (
        <div className="mt-6">
            <Helmet>
                <title>Blog</title>
            </Helmet>
            <h1 className="text-2xl md:text-2xl lg:text-4xl font-semibold mb-2 border-b-2 border-b-[#F2613F] pb-4">{ data.title }</h1>
            <p className="text-lg font-medium mt-8 mb-2">{ data.introduction }</p>
            <ul className="pl-4 list-disc mt-5">
                {
                    data.sections.map((section, idx) => (
                        <li key={idx} className="mb-3"><p><span className="text-lg font-semibold">{ section.heading }</span><br/>{ section.content }</p></li>
                    ))
                }
            </ul>
            <p className="text-lg font-medium mt-8 mb-2">{ data.conclusion }</p>
        </div>
    );
};

export default BlogDetails;