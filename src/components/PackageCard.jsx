import PropTypes from 'prop-types';
import { CiHeart } from "react-icons/ci";
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from './AuthProvider';
import { useContext } from 'react';
import swal from 'sweetalert';

const PackageCard = ({tourPackage}) => {
    const { coverImage, tourType, tripTitle, price, _id } = tourPackage;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const handleAddWishlist = () => {
        if (!user) {
            swal("You have to log in to add wishlist!", {
                icon: "warning",
            });
        } else {
            const wish = {
                packageName: tripTitle,
                packageId: _id,
                name: user.displayName,
                email: user.email
            };
            axiosPublic.post('/wishlist', wish)
            .then(res => {
                if (res.data.insertedId) {
                    swal("Added to wishlist!", {
                        icon: "success",
                    });
                } else {
                    swal("Failed to add wishlist!", {
                        icon: "warning",
                    });
                }
            })
        }
    };
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
                    <CiHeart onClick={handleAddWishlist} className='text-xl cursor-pointer'/>
                </div>
                <div className="card-actions justify-end mt-2">
                    <Button text='View Details' click={() => navigate(`/package/${_id}`)}></Button>
                </div>
            </div>
        </div>
    );
};

PackageCard.propTypes = {
    tourPackage: PropTypes.object.isRequired,
};

export default PackageCard;