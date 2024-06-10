import { Helmet } from "react-helmet-async";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
    return (
        <div className="mt-6">
            <Helmet>
                <title>Compass | About Us</title>
            </Helmet>
            <SectionTitle text="About Us" marginTop={10}></SectionTitle>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Introduction</h2>
            <p className="text-lg mt-3 text-justify">Welcome to Compass, your ultimate guide to exploring the world&apos;s most captivating destinations. We are dedicated to providing exceptional tour packages that cater to every type of traveler. Whether you&apos;re seeking adventure, relaxation, cultural immersion, or wildlife encounters, Compass is here to make your travel dreams come true.</p>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Our Story</h2>
            <p className="text-lg mt-3 text-justify">Compass was founded with a passion for travel and a mission to make the world accessible to everyone. Our journey began as a small group of travel enthusiasts who wanted to share their love for discovering new places with others. Over the years, we have grown into a trusted travel partner, offering diverse and meticulously crafted tour packages that showcase the beauty and diversity of our planet. From the bustling streets of Tokyo to the serene beaches of the Maldives, Compass has guided countless travelers on unforgettable journeys.</p>
            <h2 className="text-2xl font-semibold mt-8 mb-2 border-b border-b-[#F2613F] pb-1">Our Values</h2>
            <p className="text-lg mt-3 text-justify mb-3">At Compass, our core values drive everything we do:</p>
            <ul>
                <li className="text-lg mb-1">
                    <span className="font-semibold">Customer-Centric Service: </span>
                    We prioritize our clients&apos; needs and strive to exceed their expectations with personalized and attentive service.
                </li>
                <li className="text-lg mb-1">
                    <span className="font-semibold">Integrity: </span>
                    We believe in transparency, honesty, and ethical practices in all our dealings.
                </li>
                <li className="text-lg mb-1">
                    <span className="font-semibold">Excellence: </span>
                    We are committed to providing high-quality travel experiences, from accommodation and transportation to guided tours and activities.
                </li>
                <li className="text-lg mb-1">
                    <span className="font-semibold">Sustainability: </span>
                    We promote responsible travel practices that minimize environmental impact and support local communities.
                </li>
                <li className="text-lg mb-1">
                    <span className="font-semibold">Innovation: </span>
                    We continuously seek new and exciting ways to enhance our tour packages and provide unique travel experiences.
                </li>
            </ul>
            <div className="flex justify-center mt-10">
                <Button click={() => navigate('/contact-us')} text='Want to contact?'></Button>
            </div>
        </div>
    );
};

export default About;