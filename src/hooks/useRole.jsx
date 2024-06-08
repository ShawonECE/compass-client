import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { isPending, data, refetch } = useQuery({ queryKey: [`role_${user?.email}`], queryFn: async() => {
        const data = await axiosPublic.get(`/user?email=${user?.email}`);
        return data.data.role;
    } });

    return { isPending, data, refetch };
};

export default useRole;