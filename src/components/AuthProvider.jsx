import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import auth from './../../firebaseConfig';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
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
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                axiosPublic.post('/jwt', { email: currentUser.email })
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    axiosPublic.post('/user', { email: currentUser.email })
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('User saved');
                        }
                    });
                });
            } else {
                localStorage.removeItem('token');
            }
        });

        return () => {
            unSubscribe();
        }
    }, [axiosPublic]);
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