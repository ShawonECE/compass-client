import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserRow from "./UserRow";
import swal from "sweetalert";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { isPending, data, refetch } = useQuery({ queryKey: ['users'], queryFn: async() => {
        const data = await axiosSecure.get('/users');
        return data.data;
    } });

    if (isPending) {
        return (
            <div className="skeleton w-full p-5 h-48"></div>
        )
    }

    const makeAdmin = (email, role) => {
        swal({
            title: "Are you sure to make him/her admin?",
            text: "Once changed, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axiosSecure.patch('/change-role', { email: email, role: role })
                        .then(data => {
                            if (data.data.modifiedCount > 0) {
                                refetch();
                                swal("Role changed successfully!", {
                                    icon: "success",
                                });
                            } else {
                                swal("Role changing failed!", {
                                    icon: "warning",
                                });
                            }
                        });
                }
            });
    };

    return (
        <div className='my-10'>
            <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>Here are total { data.length } users</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(user => <UserRow key={user._id} user={user} makeAdmin={makeAdmin}></UserRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;