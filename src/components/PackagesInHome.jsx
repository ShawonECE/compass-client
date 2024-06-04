import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PackageCard from "./PackageCard";
import Button from './Button';
import { useNavigate } from "react-router-dom";

const PackagesInHome = () => {
    const axiosPublic = useAxiosPublic();

    const { isPending, data } = useQuery({ queryKey: ['3packages'], queryFn: async() => {
        const data = await axiosPublic.get('/packages?limit=3');
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
        <div className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    data.map(tourPackage => <PackageCard key={tourPackage._id} tourPackage={tourPackage}></PackageCard>)
                }
            </div>
            <div className="flex justify-center mt-5">
                <Button text='All Packages' click={() => navigate('/packages')}></Button>
            </div>
        </div>
    );
};

export default PackagesInHome;