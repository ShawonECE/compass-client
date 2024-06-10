import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserRow from "./UserRow";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [role, setRole] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [keyword, setKeyword] = useState('');
    const [searched, setSearched] = useState(false);

    const handleRole = (e) => {
        const value = e.target.value;
        setRole(value);
        if (value === 'All Users') {
            setFilterRole('');
        } else {
            setFilterRole(value.toLowerCase());
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        setKeyword(form.search.value);
        setSearched(true);
        form.reset();
    };

    const handleClearSearch = () => {
        setKeyword('');
        setSearched(false);
    };

    const { isPending, data, refetch } = useQuery({ queryKey: [`users-${filterRole}-${keyword}`], queryFn: async() => {
        const data = await axiosSecure.get(`/users?role=${filterRole}&keyword=${keyword}`);
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
            <Helmet>
                <title>Manage users</title>
            </Helmet>
            <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>Here are total { data.length } users</h2>
            <div className="flex justify-center mt-8">
                <select value={role} onChange={handleRole} className="select max-w-xs bg-[#F2613F] font-semibold text-white">
                    <option>All Users</option>
                    <option>User</option>
                    <option>Admin</option>
                    <option>Guide</option>
                </select>
            </div>
            <div className="flex justify-center">
                <div className="join mt-5 mb-5">
                    <form onSubmit={handleSearch} className="flex items-center">
                        <input className="input input-bordered join-item w-64 md:w-96" placeholder="Search by name or email" name="search"/>
                        <button type="submit" className="btn border-0 join-item bg-[#F2613F] text-[#E7F6F2]">Search</button>
                    </form>
                </div>
            </div>
            {
                searched &&
                <div className="flex justify-center mt-4">
                    <button className="btn" onClick={handleClearSearch}><MdOutlineCancel className="text-lg" /> Clear Search</button>
                </div>
            }
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