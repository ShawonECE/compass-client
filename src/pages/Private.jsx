import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return (
            <div className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
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