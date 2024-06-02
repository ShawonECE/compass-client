import PropTypes from 'prop-types';
import { CiHeart } from "react-icons/ci";
import Button from './Button';

const PackageCard = ({tourPackage}) => {
    const { coverImage, tourType, tripTitle, price } = tourPackage;
    return (
        <div className="card bg-[#F2613F] bg-opacity-10 shadow-2xl">
            <figure><img src={coverImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    { tripTitle }
                </h2>
                <div className="badge badge-outline border-[#F2613F] text-[#F2613F]">{ tourType } Tour</div>
                <div className="flex justify-around">
                    <p>Price: <span className='font-semibold'>${price}</span></p>
                    <CiHeart className='text-xl'/>
                </div>
                <div className="card-actions justify-end">
                    <Button text='View Details'></Button>
                </div>
            </div>
        </div>
    );
};

PackageCard.propTypes = {
    tourPackage: PropTypes.object.isRequired,
};

export default PackageCard;