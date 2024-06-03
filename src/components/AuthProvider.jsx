import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import auth from './../../firebaseConfig';
// import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };
    const updateInfo = (info) => {
        setLoading(true);
        return updateProfile(auth.currentUser, info);
    };
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            // const loggedUser = { user: user?.email };
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false);

            // if (currentUser) {
            //     axios.post('https://job-quest-server-alpha.vercel.app/jwt', { user: currentUser.email }, { withCredentials: true})
            // } else {
            //     axios.post('https://job-quest-server-alpha.vercel.app/logout', { loggedUser }, { withCredentials: true})
            // }
        });

        return () => {
            unSubscribe();
        }
    }, [user]);
    const AuthInfo = {user, loading, setLoading, setUser, signInWithGoogle, createUser, signInUser, logOutUser, updateInfo};
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;