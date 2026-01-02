"use client"

import { sendReserveTime } from "@/actions/ReserveActions";
import ReservedContext from "@/context/ReservedContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { BiCalendar, BiTime, BiUser, BiX } from "react-icons/bi";
import { MdOutlineDesignServices } from "react-icons/md";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const SetReserveModal = ({ setOpenModal, doReserveData }) => {
    const [stateSendTime, formActionSendTime] = useActionState(sendReserveTime, {});
    const router = useRouter();
    const { saveReservedData } = useContext(ReservedContext);
    console.log(doReserveData)

    // Handle body scroll lock and ESC key
    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Handle ESC key
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOpenModal(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Cleanup
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [setOpenModal]);

    // Handle reservation response
    useEffect(() => {
        if (!stateSendTime?.message) return;

        toast.dismiss();
        toast(stateSendTime?.message, { type: `${stateSendTime.status}` });

        if (stateSendTime?.loginStatus === "no-login") {
            setOpenModal(false);
            setTimeout(() => {
                router.push("/");
            }, 3000);
        }
        if (stateSendTime.status === "success") {
            setOpenModal(false);
            saveReservedData(stateSendTime?.data);
            router.push("/result");
        } else if (stateSendTime.status === "error") {
            setOpenModal(false);
        }
    }, [stateSendTime]);

    // Handle click outside
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setOpenModal(false);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999999] p-4 animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="w-full max-w-[480px] relative bg-white shadow-2xl rounded-2xl overflow-hidden animate-slideUp">

                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-liteGold to-semiLiteGold p-6 relative">
                    <button
                        onClick={() => setOpenModal(false)}
                        className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110"
                        type="button"
                        aria-label="بستن"
                    >
                        <BiX className="text-white" size={24} />
                    </button>

                    <h3 className="text-white font-bold text-xl text-center pt-2">
                        تأیید رزرو نوبت
                    </h3>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    {/* Confirmation Message */}
                    <div className="text-center mb-6">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            آیا از رزرو این نوبت مطمئن هستید؟
                        </p>
                    </div>

                    {/* Reservation Details */}
                    <div className="space-y-4 bg-gray-50 rounded-xl p-5">

                        {/* Service */}
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                            <div className="p-2 bg-liteGold/10 rounded-lg">
                                <MdOutlineDesignServices className="text-liteGold drop-shadow" size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 mb-1">خدمت</p>
                                <p className="font-semibold text-gray-800">
                                    {doReserveData.services}
                                </p>
                            </div>
                        </div>

                        {/* Provider */}
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                            <div className="p-2 bg-liteGold/10 rounded-lg">
                                <BiUser className="text-liteGold drop-shadow" size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 mb-1">خدمات‌دهنده</p>
                                <p className="font-semibold text-gray-800">
                                    {doReserveData.provider}
                                </p>
                            </div>
                        </div>

                        {/* Date */}
                        {doReserveData.day && (
                            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                                <div className="p-2 bg-liteGold/10 rounded-lg">
                                    <BiCalendar className="text-liteGold drop-shadow" size={22} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-1">تاریخ</p>
                                    <p className="font-semibold text-gray-800">
                                        {doReserveData.day}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Time */}
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-liteGold/10 rounded-lg">
                                <BiTime className="text-liteGold" size={22} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 mb-1">ساعت</p>
                                <p className="font-semibold text-gray-800">
                                    {doReserveData.time}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <form action={formActionSendTime} className="space-y-3">
                        <input
                            type="hidden"
                            name="time_id"
                            id="time_id"
                            value={doReserveData.id}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            {/* Confirm Button */}
                            <button
                                type="submit"
                                onClick={() => toast.loading("در حال ثبت نوبت شما ...")}
                                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                <IoCheckmarkCircle size={20} />
                                تأیید و رزرو
                            </button>

                            {/* Cancel Button */}
                            <button
                                type="button"
                                onClick={() => setOpenModal(false)}
                                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all transform hover:scale-105"
                            >
                                <IoCloseCircle size={20} />
                                انصراف
                            </button>
                        </div>
                    </form>

                    {/* Info Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <p className="text-sm text-blue-700">
                            با تأیید، نوبت شما ثبت و رزرو خواهد شد
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetReserveModal;
