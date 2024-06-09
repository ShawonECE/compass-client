import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AssignedRow from "./AssignedRow";
import swal from "sweetalert";

const AssignedTours = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { isPending: guideProfilePending, data: guideProfile } = useQuery({ queryKey: [`guide_profile_${user.email}`], queryFn: async() => {
        const data = await axiosSecure.get(`/guide-profile?email=${user.email}`);
        return data.data;
    } });

    let guideId;

    const { isPending: bookingsPending, data: bookings, refetch } = useQuery({
        queryKey: [`guide_bookings_${guideId}`],
        queryFn: async () => {
            const data = await axiosSecure.get(`/assigned-bookings?guideId=${guideId}`);
            return data.data;
        },
        enabled: !guideProfilePending
    });

    if (guideProfilePending) {
        return (
            <div className="skeleton w-full p-5 h-48"></div>
        )
    } else {
        guideId = guideProfile._id;
    }

    if (bookingsPending) {
        return (
            <div className="skeleton w-full p-5 h-48"></div>
        )
    }

    const handleAccept = (id) => {
        axiosSecure.patch('/status', { bookingId: id, status: 'accepted' })
        .then(res => {
            if (res.data.modifiedCount > 0) {
                swal("Booking has been accepted!", {
                    icon: "success",
                });
                refetch();
            } else {
                swal("Failed to accept!", {
                    icon: "warning",
                });
            }
        })
    };

    const handleReject = (id) => {
        axiosSecure.patch('/status', { bookingId: id, status: 'rejected' })
        .then(res => {
            if (res.data.modifiedCount > 0) {
                swal("Booking has been rejected!", {
                    icon: "success",
                });
                refetch();
            } else {
                swal("Failed to accept!", {
                    icon: "warning",
                });
            }
        })
    };


    return (
        <div className='my-10'>
            {
                bookings.length ? <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>You have { bookings.length } assigned tours</h2>
                :
                <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>You have no assigned tours</h2>
            }
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Tourist</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <AssignedRow key={booking._id} booking={booking} handleAccept={handleAccept} handleReject={handleReject}></AssignedRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedTours;