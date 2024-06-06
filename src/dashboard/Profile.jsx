import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import useRole from "../hooks/useRole";
import AddStory from "./user/AddStory";

const Profile = () => {
    const { data: role } = useRole();
    const { user } = useContext(AuthContext);
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 container mx-auto px-4 gap-10">
            <div>
                <img src={ user.photoURL } alt="" className="max-w-56 mx-auto md:max-w-72 rounded-full"/>
                <h2 className="text-3xl font-bold mt-5 text-center">Name: { user.displayName }</h2>
                <h3 className="text-xl text-center">Email: { user.email }</h3>
            </div>
            <div>
                {
                    role === "admin" &&
                    <img src="https://i.ibb.co/6v1spWx/admin.png" alt="" className="max-w-72 mx-auto md:max-w-96"></img>
                }
                {
                    role === "guide" &&
                    <img src="https://i.ibb.co/Kb8QcCh/guide.png" alt="" className="max-w-72 mx-auto md:max-w-96"></img>
                }
                {
                    role === "user" &&
                    <AddStory></AddStory>
                }
            </div>
        </div>
    );
};

export default Profile;