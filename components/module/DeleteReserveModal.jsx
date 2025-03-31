"use client"

import { cancelReserved } from "@/actions/ReserveActions";
import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";

const DeleteReserveModal = ({ setOpenModal, selectedTimeId }) => {
    const [stateCancelReserved, formActionCancelReserved] = useActionState(cancelReserved, {});
    console.log(stateCancelReserved)
    useEffect(() => {
        toast.dismiss();
        toast(stateCancelReserved?.message, { type: `${stateCancelReserved.status}` });
        if (stateCancelReserved.status === "error") {
            setOpenModal(false);
        }
    }, [stateCancelReserved]);

    return (
        <div className="modal-1 fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50">
            <div className="w-[85vw] relative p-4 max-w-[420px] h-[150px] bg-white shadow rounded-lg ">
                <img className="w-[32px] absolute top-[-7px] left-[-14px] hover:scale-105 transition-all cursor-pointer"
                    src="/images/cancel-close-svgrepo-com.svg"
                    alt="cancel-icon"
                    onClick={() => setOpenModal(false)} />
                <h3 className="font-semibold pb-4">

                    آیا از لغو نوبت خود در روز
                    {selectedTimeId.day}
                    ساعت {selectedTimeId.time}  اطمینان دارید؟

                </h3>
                <form action={formActionCancelReserved}>
                    <input type="hidden" name="time_id" id="time_id" value={selectedTimeId.time_id} />
                    <button type="submit"
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        بله
                    </button>
                </form>
            </div>
        </div >
    );
};

export default DeleteReserveModal;