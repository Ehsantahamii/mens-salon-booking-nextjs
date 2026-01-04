"use client"

import { sendUserName } from "@/actions/LoginActions";
import UserInfoContext from "@/context/UserInfoContext";
import { useContext, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { X, User, Sparkles } from "lucide-react";

const ChangeUsernameModal = ({ setOpenModal }) => {
    const [stateChangeUsername, formActionChangeUsername, isPending] = useActionState(sendUserName, {});
    const { saveUserData } = useContext(UserInfoContext);

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setOpenModal(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setOpenModal]);

    useEffect(() => {
        isPending && toast.loading("در حال تغییر نام ...");
        !isPending && toast.dismiss();
    }, [isPending]);

    useEffect(() => {
        if (stateChangeUsername.status) {
            setOpenModal(false);
        }
        if (stateChangeUsername.status === "success") {
            toast.success("نام و نام خانوادگی با موفقیت تغییر کرد.");
            localStorage.setItem("user", JSON.stringify(stateChangeUsername?.data));
            saveUserData(stateChangeUsername?.data);
        } else if (stateChangeUsername.status === "error") {
            toast(stateChangeUsername?.message, { type: `${stateChangeUsername.status}` });
        }
    }, [stateChangeUsername, saveUserData, setOpenModal]);

    return (
        <div className="fixed w-full h-screen inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
                onClick={() => setOpenModal(false)}
            />

            {/* Modal Container */}
            <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header با گرادیانت */}
                <div className="relative overflow-hidden bg-gradient-to-r from-[#ffd39a] via-[#ffcd7a] to-[#ffc062] p-6">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                                <User className="text-[#ffa726]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white drop-shadow-lg">
                                    تغییر نام کاربری
                                </h2>
                                <p className="text-white/90 text-xs mt-0.5 flex items-center gap-1.5">
                                    <Sparkles size={12} />
                                    ویرایش اطلاعات حساب کاربری
                                </p>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setOpenModal(false)}
                            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 group"
                        >
                            <X className="text-white group-hover:scale-110 transition-transform" size={20} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <form action={formActionChangeUsername} className="p-6 space-y-5">
                    {/* Info Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                        <p className="text-sm text-blue-800 leading-relaxed">
                            لطفاً نام و نام خانوادگی جدید را با دقت وارد کنید.
                        </p>
                    </div>

                    {/* Input Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="change-name"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            نام
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <User className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="change-name"
                                placeholder="نام "
                                maxLength={25}
                                required
                                disabled={isPending}
                                className="w-full pr-12 pl-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-[#ffd39a] focus:bg-white focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            حداکثر ۲۵ کاراکتر
                        </p>
                    </div>

                    {/* Input Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="change-name"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            نام خانوادگی
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                <User className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="text"
                                name="last_name"
                                id="change-last-name"
                                placeholder="نام خانوادگی"
                                maxLength={25}
                                required
                                disabled={isPending}
                                className="w-full pr-12 pl-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:border-[#ffd39a] focus:bg-white focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            حداکثر ۲۵ کاراکتر
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            disabled={isPending}
                            className="flex-1 px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            انصراف
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#ffd39a] to-[#ffcd7a] hover:from-[#ffcd7a] hover:to-[#ffc062] text-gray-800 font-bold rounded-xl shadow-lg shadow-[#ffd39a]/30 hover:shadow-xl hover:shadow-[#ffd39a]/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {isPending ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-gray-800 border-t-transparent rounded-full animate-spin" />
                                    <span>در حال ثبت...</span>
                                </>
                            ) : (
                                <>
                                    <span>تغییر نام</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ChangeUsernameModal;
