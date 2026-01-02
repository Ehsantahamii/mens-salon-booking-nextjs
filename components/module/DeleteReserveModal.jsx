"use client"

import { useEffect, useActionState, useTransition } from "react";
import { X, AlertTriangle, Loader2, CheckCircle, XCircle } from "lucide-react";
import { cancelReserved } from "@/actions/ReserveActions";

export default function DeleteReserveModal({ selectedTimeId, setOpenModal }) {
    const [state, formAction, isActionPending] = useActionState(cancelReserved, {
        status: "",
        message: "",
    });
    const [isTransitionPending, startTransition] = useTransition();

    // ترکیب هر دو pending state
    const isPending = isActionPending || isTransitionPending;

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleEscape = (e) => {
            if (e.key === "Escape") setOpenModal(false);
        };

        window.addEventListener("keydown", handleEscape);
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [setOpenModal]);

    // بستن مودال و رفرش صفحه بعد از موفقیت
    useEffect(() => {
        if (state.status === "success") {
            setTimeout(() => {
                setOpenModal(false);
                window.location.reload();
            }, 1500);
        }
    }, [state.status, setOpenModal]);

    // چک کردن برای logout
    useEffect(() => {
        if (state.loginStatus === "no-login") {
            window.location.href = "/login";
        }
    }, [state.loginStatus]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isPending) {
            setOpenModal(false);
        }
    };

    const handleDelete = () => {
        startTransition(() => {
            const formData = new FormData();
            formData.append("time_id", selectedTimeId.time_id);
            formAction(formData);
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div
                dir="rtl"
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-amber-400 p-6 relative">
                    <button
                        onClick={() => !isPending && setOpenModal(false)}
                        disabled={isPending}
                        className="absolute left-4 top-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X className="text-white" size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <AlertTriangle className="text-white" size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">حذف نوبت</h2>
                            <p className="text-red-100 text-sm">
                                آیا از حذف این نوبت اطمینان دارید؟
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* نمایش پیام خطا یا موفقیت */}
                    {state.message && (
                        <div
                            className={`border rounded-xl p-4 flex items-start gap-3 ${state.status === "success"
                                    ? "bg-green-50 border-green-200"
                                    : "bg-red-50 border-red-200"
                                }`}
                        >
                            {state.status === "success" ? (
                                <CheckCircle
                                    className="text-green-600 flex-shrink-0 mt-0.5"
                                    size={20}
                                />
                            ) : (
                                <XCircle
                                    className="text-red-600 flex-shrink-0 mt-0.5"
                                    size={20}
                                />
                            )}
                            <p
                                className={`text-sm leading-relaxed ${state.status === "success"
                                        ? "text-green-800"
                                        : "text-red-800"
                                    }`}
                            >
                                {state.message}
                            </p>
                        </div>
                    )}

                    {state.status !== "success" && (
                        <>
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    با حذف این نوبت، تمام اطلاعات مربوط به رزرو شما حذف
                                    خواهد شد.
                                </p>
                            </div>

                            {/* Reservation Details */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">سرویس:</span>
                                    <span className="text-gray-800 font-medium text-sm">
                                        {selectedTimeId.services}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">تاریخ:</span>
                                    <span className="text-gray-800 font-medium text-sm">
                                        {selectedTimeId.day}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm">ساعت:</span>
                                    <span className="text-gray-800 font-medium text-sm">
                                        {selectedTimeId.time}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleDelete}
                                    disabled={isPending}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            <span>در حال حذف...</span>
                                        </>
                                    ) : (
                                        <span>بله، حذف شود</span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setOpenModal(false)}
                                    disabled={isPending}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    انصراف
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}