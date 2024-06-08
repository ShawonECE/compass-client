import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../components/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import WishRow from "./WishRow";
import swal from "sweetalert";

const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { isPending, data, refetch } = useQuery({ queryKey: [`wishlist_${user.email}`], queryFn: async() => {
        const data = await axiosSecure.get(`/wishlist?email=${user.email}`);
        return data.data;
    } });

    if (isPending) {
        return (
            <div className="skeleton m-10 h-48"></div>
        )
    }

    const handleDelete = (wishId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axiosSecure.delete(`/wishlist/${wishId}`)
                .then(data => {
                    if (data.data.deletedCount === 1) {
                        swal("Wish has been deleted!", {
                            icon: "success",
                        });
                        refetch();
                    } else {
                        swal("Deletion failed!", {
                            icon: "warning",
                        });
                    }
                });
            }
        });
    };

    return (
        <div className='my-10'>
            {
                <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>You have { data.length } packages in wishlist</h2>
            }
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(wish => <WishRow key={wish._id} wish={wish} handleDelete={handleDelete}></WishRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Wishlist;