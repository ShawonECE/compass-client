import { GiCastle, GiForest } from "react-icons/gi";
import SectionTitle from "./SectionTitle";
import { FaHiking, FaUmbrellaBeach } from "react-icons/fa";
import { BiSolidWine } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const TourTypes = () => {
    const navigate = useNavigate();
    return (
        <div>
            <SectionTitle text="Available Tour Types" marginTop={16}></SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-10">
                <div onClick={() => navigate('/packages-by-category/Cultural Heritage')} className="border-4 border-[#F2613F] rounded-full w-44 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 p-8 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform">
                    <GiCastle className="text-8xl text-[#F2613F]"/>
                    <p className="text-center text-[#F2613F]">Cultural Heritage</p>
                </div>
                <div onClick={() => navigate('/packages-by-category/Adventure and Hiking')} className="border-4 border-[#F2613F] rounded-full w-44 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 p-8 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform">
                    <FaHiking className="text-8xl text-[#F2613F]"/>
                    <p className="text-center text-[#F2613F]">Adventure and Hiking</p>
                </div>
                <div onClick={() => navigate('/packages-by-category/Wildlife and Nature')} className="border-4 border-[#F2613F] rounded-full w-44 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 p-8 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform">
                    <GiForest className="text-8xl text-[#F2613F]"/>
                    <p className="text-center text-[#F2613F]">Wildlife and Nature</p>
                </div>
                <div onClick={() => navigate('/packages-by-category/Beach and Relaxation')} className="border-4 border-[#F2613F] rounded-full w-44 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 p-8 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform">
                    <FaUmbrellaBeach className="text-8xl text-[#F2613F]"/>
                    <p className="text-center text-[#F2613F]">Beach and Relaxation</p>
                </div>
                <div onClick={() => navigate('/packages-by-category/Culinary and Wine')} className="border-4 border-[#F2613F] rounded-full w-44 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 p-8 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform">
                    <BiSolidWine className="text-8xl text-[#F2613F]"/>
                    <p className="text-center text-[#F2613F]">Culinary and Wine</p>
                </div>
            </div>
        </div>
    );
};

export default TourTypes;