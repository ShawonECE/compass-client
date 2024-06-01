import { FaRegCompass } from "react-icons/fa";
import Button from "./Button";

const Banner = () => {
    return (
        <div className="hero min-h-screen mt-16" style={{ backgroundImage: 'url(https://i.ibb.co/ss1ygwb/banner-mountain.jpg)' }}>
            <div className="hero-overlay bg-black bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <div className="flex justify-center gap-4 items-center mb-5">
                        <FaRegCompass className="text-4xl text-[#F2613F] mt-2"/>
                        <h1 className="text-5xl font-bold text-center">COM<span className="text-[#F2613F]">PASS</span></h1>
                    </div>
                    <p className="mb-5">Discover breathtaking destinations with our travel guide. Explore majestic mountains, serene beaches, lush forests, and ancient wonders. Start your adventure and uncover hidden gems today!</p>
                    <Button text="Explore Now"></Button>
                </div>
            </div>
        </div>
    );
};

export default Banner;