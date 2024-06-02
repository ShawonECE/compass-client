import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../hooks/useAxiosPublic";
import PackageCard from "../components/PackageCard";
import SectionTitle from './../components/SectionTitle';

const Packages = () => {
    const { isPending, data } = useQuery({ queryKey: ['packages'], queryFn: async() => {
        const data = await axiosPublic.get('/packages');
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
                    data.map(tourPackage => <PackageCard key={tourPackage._id} tourPackage={tourPackage}></PackageCard>)
                }
            </div>
        </div>
    );
};

export default Packages;