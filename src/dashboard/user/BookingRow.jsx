import PropTypes from 'prop-types';

const BookingRow = ({ booking, handlePaymentModal, handleDelete }) => {
    const { package: packageName, guideName, price, date, status, _id } = booking;
    return (
        <tr className="hover">
            <td>{ packageName }</td>
            <td>{ guideName }</td>
            <td>{ date }</td>
            <td>${ price }</td>
            <td>{ status }</td>
            <td><button onClick={() => handlePaymentModal(_id, price)} className="btn btn-xs bg-[#F2613F] text-white" disabled={ !(status === 'accepted') }>Pay</button></td>
            <td><button onClick={() => handleDelete(_id)} className="btn btn-xs bg-red-500 text-white" disabled={ !(status === 'in review') }>Cancel</button></td>
        </tr>
    );
};

BookingRow.propTypes = {
    booking: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handlePaymentModal: PropTypes.func.isRequired,
};

export default BookingRow;