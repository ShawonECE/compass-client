import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story }) => {
    const { touristName, tourLocation, image1, _id } = story;
    const navigate = useNavigate();

    return (
        <div className="card card-compact bg-[#F2613F] bg-opacity-10 shadow-xl">
            <figure><img src={image1} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{ touristName } was in { tourLocation }</h2>
                <p>{ story.story.slice(0, 50) }... <span onClick={() => navigate(`/story/${_id}`)} className='text-[#F2613F] underline underline-offset-2 cursor-pointer'>Read more</span></p>
            </div>
        </div>
    );
};

StoryCard.propTypes = {
    story: PropTypes.object.isRequired,
};

export default StoryCard;