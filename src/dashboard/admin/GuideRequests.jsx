import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RequestRow from "./RequestRow";
import { useState } from "react";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";

const GuideRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [loadingOpen, setLoadingOpen] = useState(false);

    const { isPending, data, refetch } = useQuery({ queryKey: ['guide-requests'], queryFn: async() => {
        const data = await axiosSecure.get('/all-guide-request');
        return data.data;
    } });

    if (isPending) {
        return (
            <div className="skeleton w-full p-5 h-48"></div>
        )
    }

    const handleApprove = (email, request) => {
        swal({
            title: "Are you sure to approve this request?",
            text: "Once approved, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (approve) => {
            if (approve) {
                setLoadingOpen(true);
                const newGuide = { ...request };
                delete newGuide._id;

                const result_1 = await axiosSecure.post('/guide', newGuide);
                if (!result_1.data.insertedId) {
                    setLoadingOpen(false);
                    swal("Approving request failed!", {
                        icon: "warning",
                    });
                    return;
                }

                const result_2 = await axiosSecure.delete(`/guide-request?email=${email}`);
                if (!result_2.data.deletedCount > 0) {
                    setLoadingOpen(false);
                    swal("Approving request failed!", {
                        icon: "warning",
                    });
                    return;
                }

                const res = await axiosSecure.patch('/change-role', { email: email, role: 'guide' });
                if (res.data.modifiedCount > 0) {
                    refetch();
                    setLoadingOpen(false);
                    swal("Approved successfully!", {
                        icon: "success",
                    });
                } else {
                    setLoadingOpen(false);
                    swal("Approving request failed!", {
                        icon: "warning",
                    });
                }

            }
        });
    };

    const handleReject = async (email) => {
        swal({
            title: "Are you sure to reject this request?",
            text: "Once rejected, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (reject) => {
                if (reject) {
                    const result = await axiosSecure.delete(`/guide-request?email=${email}`);
                    if (result.data.deletedCount > 0) {
                        refetch();
                        swal("Rejected successfully!", {
                            icon: "success",
                        });
                    } else {
                        swal("Rejection request failed!", {
                            icon: "warning",
                        });
                    }
                }
            });
    };

    return (
        <div className='my-10'>
            <Helmet>
                <title>Guide requests</title>
            </Helmet>
            {
                data.length ? <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>Total { data.length } requests to be a guide</h2>
                :
                <h2 className='text-center text-2xl text-[#F2613F] font-bold mb-5'>No requests to be a guide</h2>
            }
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Education</th>
                            <th>Work Experience</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(request => <RequestRow key={request._id} request={request} handleApprove={handleApprove} handleReject={handleReject}></RequestRow>)
                        }
                    </tbody>
                </table>
            </div>

            <input type="checkbox" checked={loadingOpen} id="my_modal_6" className="modal-toggle" readOnly />
            <div className="modal" role="dialog">
                <div className="modal-box flex justify-center">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            </div>
        </div>
    );
};

export default GuideRequests;