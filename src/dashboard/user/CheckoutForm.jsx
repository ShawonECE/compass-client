import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../components/AuthProvider';
import swal from 'sweetalert';
import moment from 'moment';

const CheckoutForm = ({ price, bookingId, setModalOpen, refetch }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosPublic.post('/create-payment-intent', { price: price })
            .then(res => {
                // console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosPublic, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            setLoading(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setError(error.message);
            setLoading(false);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setError('');
            setLoading(false);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                }
            }
        });

        if (confirmError) {
            // console.log('confirmError', confirmError);
            setError(confirmError.message);
            setLoading(false);
        } else {
            // console.log('paymentIntent', paymentIntent);
            setError('');

            if (paymentIntent.status === 'succeeded') {
                const paymentDate = moment(paymentIntent.created * 1000).format('YYYY-MM-DD');
                const paymentHistory = {
                    amount: price,
                    bookingId: bookingId,
                    txnId: paymentIntent.id,
                    date: paymentDate
                };

                const res = await axiosPublic.post('/payments', paymentHistory);
                if (res.data.insertedId) {
                    axiosPublic.patch('/confirm-booking', { bookingId })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            setModalOpen(false);
                            setLoading(false);
                            swal("Paid successfully!", {
                                icon: "success",
                            });
                        } else {
                            setModalOpen(false);
                            setLoading(false);
                            swal("Payment failed!", {
                                icon: "warning",
                            });
                        }
                    })
                } else {
                    setModalOpen(false);
                    setLoading(false);
                    swal("Payment failed!", {
                        icon: "warning",
                    });
                }
            }
        }
    };


    return (
        <div className="card shrink-0 w-full max-w-lg bg-base-200 shadow-2xl">
            <h2 className="text-center text-xl font-bold mt-5 mb-5">Pay ${ price } to confirm the booking</h2>
            <form onSubmit={handleSubmit} className="p-5">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className="btn bg-[#F2613F] text-white mt-5" disabled={!stripe || !clientSecret}>
                    {
                        loading ? <span className="loading loading-bars loading-xs"></span> 
                        :
                        'pay'
                    }
                </button>
            </form>
            <p className="text-red-500 pl-5 pb-5">{ error }</p>
        </div>
    );
};

CheckoutForm.propTypes = {
    price: PropTypes.number.isRequired,
    bookingId: PropTypes.string.isRequired,
    setModalOpen: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired
};

export default CheckoutForm;