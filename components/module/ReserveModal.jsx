"use client"

import { sendReserveTime } from "@/actions/ReserveActions";
import ReservedContext from "@/context/ReservedContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";

const SetReserveModal = ({ setOpenModal, doReserveData }) => {
    const [stateSendTime, formActionSendTime] = useActionState(sendReserveTime, {});
    const router = useRouter();
    const { saveReservedData } = useContext(ReservedContext)
    useEffect(() => {
        toast.dismiss();
        toast(stateSendTime?.message, { type: `${stateSendTime.status}` });

        if (stateSendTime?.loginStatus === "no-login") {
            setOpenModal(false)
            setTimeout(() => {
                router.push("/")
            }, 3000)
        }
        if (stateSendTime.status === "success") {
            setOpenModal(false)
            saveReservedData(stateSendTime?.data);
            router.push("/result")
        } else if (stateSendTime.status === "error") {
            setOpenModal(false)

        }

    }, [stateSendTime]);

    return (
        <div className="modal-1 fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50  z-[999999] ">
            <div className="w-[85vw] relative p-4 max-w-[368px]  bg-white shadow rounded-lg  z-[999999]">
                <img className="w-[32px] absolute top-[-7px] left-[-14px] hover:scale-105 transition-all cursor-pointer"
                    src="/images/cancel-close-svgrepo-com.svg"
                    alt="cancel-icon"
                    onClick={() => setOpenModal(false)} />
                <h3 className="font-semibold pb-4">

                    آیا از رزرو نوبت
                    "  {doReserveData.services}"
                    در ساعت

                    {doReserveData.time}
                    توسط
                    " {doReserveData.provider}"
                    مطمئن هستید؟
                    <br />
                </h3>
                <form action={formActionSendTime}>
                    <input type="hidden" name="time_id" id="time_id" value={doReserveData.id} />
                    <button type="submit"
                        className="text-red-700  border font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={() => toast.loading("در حال ثبت نوبت شما ...")}

                    >
                        بله
                    </button>
                </form>
            </div>
        </div >
    );
};

export default SetReserveModal;