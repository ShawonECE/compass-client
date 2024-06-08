import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider';

const Private = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return (
            <div className="skeleton h-48 m-10"></div>
        );
    } else {
        if (user) {
            return children;
        } else {
            return <Navigate state={{to: location.pathname}} to='/login'></Navigate>;
        }
    }
};

Private.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Private;