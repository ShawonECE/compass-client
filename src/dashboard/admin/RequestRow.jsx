import PropTypes from 'prop-types';

const RequestRow = ({ request, handleApprove, handleReject }) => {
    const { name, email, education, workExperience } = request;
    return (
        <tr className="hover">
            <td>{ name }</td>
            <td>{ email }</td>
            <td>{ education }</td>
            <td>{ workExperience }</td>
            <td><button onClick={() => handleApprove(email, request)} className="btn btn-xs bg-[#F2613F] text-white">Approve</button></td>
            <td><button onClick={() => handleReject(email)} className="btn btn-xs bg-red-500 text-white">Reject</button></td>
        </tr>
    );
};

RequestRow.propTypes = {
    request: PropTypes.object.isRequired,
    handleApprove: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired
};

export default RequestRow;