import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { AuthContext } from '../../components/AuthProvider';
import { useContext } from 'react';
import BookingRow from './BookingRow';
import swal from 'sweetalert';

const Bookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { isPending, data, refetch } = useQuery({ queryKey: [`bookings_${user.email}`], queryFn: async() => {
        const data = await axiosSecure.get(`/bookings?email=${user.email}`);
        return data.data;
    } });

    if (isPending) {
        return (
            <div className="skeleton w-full p-5 h-48"></div>
        )
    }

    const handlePaymentModal = (bookingId, price) => {
        console.log('payment modal');
    };

    const handleDelete = (bookingId) => {
        swal({
            title: "Are you sure?",
            text: "Once canceled, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axiosSecure.delete(`/booking/${bookingId}`)
                .then(data => {
                    if (data.data.deletedCount === 1) {
                        swal("Booking has been canceled!", {
                            icon: "success",
                        });
                        refetch();
                    } else {
                        swal("Cancellation failed!", {
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
                data.length ? <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>You have { data.length } bookings</h2>
                :
                <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>You have no bookings</h2>
            }
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Guide</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(booking => <BookingRow key={booking._id} booking={booking} handlePaymentModal={handlePaymentModal} handleDelete={handleDelete}></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;