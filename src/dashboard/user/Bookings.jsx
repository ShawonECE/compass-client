import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { AuthContext } from '../../components/AuthProvider';
import { useContext, useState } from 'react';
import BookingRow from './BookingRow';
import swal from 'sweetalert';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { Helmet } from 'react-helmet-async';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Bookings = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [id, setId] = useState('');
    const [price, setPrice] = useState(0);
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

    const handlePaymentModal = (id, price) => {
        setPrice(parseInt(price));
        setId(id);
        setModalOpen(true);
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
            <Helmet>
                <title>My bookings</title>
            </Helmet>
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

            <input type="checkbox" checked={modalOpen} id="my_modal_6" className="modal-toggle" readOnly />
            <div className="modal" role="dialog">
                <div className="modal-box flex justify-center">
                    <form method="dialog">
                        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    {
                        modalOpen &&
                        <Elements stripe={stripePromise}>
                            <CheckoutForm price={price} bookingId={id} setModalOpen={setModalOpen} refetch={refetch} />
                        </Elements>
                    }
                </div>
            </div>
        </div>
    );
};

export default Bookings;