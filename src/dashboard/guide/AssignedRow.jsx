import PropTypes from 'prop-types';

const AssignedRow = ({booking, handleAccept, handleReject}) => {
    const { package: packageName, touristName, _id, price, date, status } = booking;
    return (
        <tr className="hover">
            <td>{ packageName }</td>
            <td>{ touristName }</td>
            <td>{ date }</td>
            <td>${ price }</td>
            <td>{ status }</td>
            <td><button onClick={() => handleAccept(_id)} className="btn btn-xs bg-[#F2613F] text-white" disabled={ !(status === 'in review') }>Accept</button></td>
            <td><button onClick={() => handleReject(_id)} className="btn btn-xs bg-red-500 text-white" disabled={ !(status === 'in review') }>Reject</button></td>
        </tr>
    );
};

AssignedRow.propTypes = {
    booking: PropTypes.object.isRequired,
    handleAccept: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
};

export default AssignedRow;