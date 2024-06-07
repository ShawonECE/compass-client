import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const WishRow = ({ wish, handleDelete }) => {
    const { packageName, _id, packageId } = wish;
    const navigate = useNavigate();
    return (
        <tr className="hover">
            <td>{ packageName }</td>
            <td><button onClick={() => navigate(`/package/${packageId}`)} className="btn btn-xs bg-[#F2613F] text-white">Details</button></td>
            <td><button onClick={() => handleDelete(_id)} className="btn btn-xs bg-red-500 text-white">Delete</button></td>
        </tr>
    );
};

WishRow.propTypes = {
    wish: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default WishRow;