import { useState } from "react";
import SectionTitle from "./SectionTitle";
import Overview from './Overview';
import PackagesInHome from './PackagesInHome';
import GuidesInHome from './GuidesInHome';

const Discover = () => {
    const [tabIdx, setTabIdx] = useState(0);
    return (
        <div>
            <SectionTitle text="Discover Our Offerings and Team" marginTop={16}></SectionTitle>

            <div className="flex justify-center mt-5">
                <h3 onClick={() => setTabIdx(0)} className={`text-lg cursor-pointer px-4 ${tabIdx === 0 ? 'border-b-2 border-b-[#F2613F]' : ''}`}>Overview</h3>
                <h3 onClick={() => setTabIdx(1)} className={`text-lg cursor-pointer px-4 ${tabIdx === 1 ? 'border-b-2 border-b-[#F2613F]' : ''}`}>Packages</h3>
                <h3 onClick={() => setTabIdx(2)} className={`text-lg cursor-pointer px-4 ${tabIdx === 2 ? 'border-b-2 border-b-[#F2613F]' : ''}`}>Our Guides</h3>
            </div>
            {
                tabIdx === 0 && <Overview></Overview>
            }
            {
                tabIdx === 1 && <PackagesInHome></PackagesInHome>
            }
            {
                tabIdx === 2 && <GuidesInHome></GuidesInHome>
            }
        </div>
    );
};

export default Discover;