import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import Discover from "../components/Discover";
import StoriesInHome from "../components/StoriesInHome";
import TourTypes from "../components/TourTypes";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Compass | Home</title>
            </Helmet>
            <Banner></Banner>
            <Discover></Discover>
            <TourTypes></TourTypes>
            <StoriesInHome></StoriesInHome>
        </div>
    );
};

export default Home;