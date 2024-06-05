import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGuides = () => {
    const axiosPublic = useAxiosPublic();

    const { isPending, data, refetch } = useQuery({ queryKey: ['guides'], queryFn: async() => {
        const data = await axiosPublic.get('/guides');
        return data.data;
    } });

    return { isPending, data, refetch };
};

export default useGuides;