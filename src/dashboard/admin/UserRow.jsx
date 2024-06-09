import PropTypes from 'prop-types';

const UserRow = ({ user, makeAdmin }) => {
    const { name, email, role } = user;
    return (
        <tr className="hover">
            <td>{ name }</td>
            <td>{ email }</td>
            <td>{ role }</td>
            <td><button onClick={() => makeAdmin(email, 'admin')} className="btn btn-xs bg-[#F2613F] text-white" disabled={role !== 'user'}>Make Admin</button></td>
        </tr>
    );
};

UserRow.propTypes = {
    user: PropTypes.object.isRequired,
    makeAdmin: PropTypes.func.isRequired
};

export default UserRow;