import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const GuideCard = ({guide}) => {
    const { name, image, _id } = guide;
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/guide/${_id}`)} className="card card-compact bg-[#F2613F] bg-opacity-10 shadow-xl relative group cursor-pointer">
            <div className="card-body">
                <div className="grid grid-cols-3 gap-2">
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                            <img src={image} />
                        </div>
                    </div>
                    <h2 className="card-title col-span-2">{name}</h2>
                </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity rounded-xl"></div>
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#F2613F] font-bold text-lg md:text-xl">
                View details
            </p>
        </div>
    );
};

GuideCard.propTypes = {
    guide: PropTypes.object.isRequired,
};

export default GuideCard;