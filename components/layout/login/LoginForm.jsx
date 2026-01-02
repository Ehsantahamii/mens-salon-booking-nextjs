"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowLeft, Sparkles, Loader2, CircleCheckBig } from "lucide-react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/actions/LoginActions";
import Link from "next/link";

const initialState = {
    status: "",
    message: "",
    otp: ""
};

function SubmitButton({ isValid }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={!isValid || pending}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 mt-8 ${isValid && !pending
                ? 'bg-[#ffd39a] text-[#3a3845] shadow-[0_8px_20px_rgba(255,211,154,0.4)] hover:shadow-[0_12px_30px_rgba(255,211,154,0.5)] hover:-translate-y-0.5 cursor-pointer'
                : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'
                }`}
        >
            {pending ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>در حال ارسال...</span>
                </>
            ) : (
                <>
                    <span>ارسال کد تایید</span>
                    <ArrowLeft size={20} />
                </>
            )}
        </button>
    );
}

export default function ModernLoginForm({ setStep, setUserPhone }) {
    const [mobile, setMobile] = useState("");
    const [isValid, setIsValid] = useState(false);

    /**
     * ✅ React 19+
     * useActionState replaces useFormState
     */
    const [state, formAction] = React.useActionState(
        loginAction,
        initialState
    );
    console.log(state)


    useEffect(() => {
        if (state.status === "success") {
            setUserPhone(mobile)
            setStep(2);
        }
    }, [state.status, setStep]);

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setMobile(value);
        setIsValid(value.length === 11);
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#3a3845] via-[#4a4855] to-[#3a3845]"
        >
            <div className="w-full max-w-md relative">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles size={32} className="text-[#ffd39a]" />
                    </div>
                    <p className="text-white/70 text-lg">
                        سامانه رزرو نوبت آنلاین
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffd39a] to-[#ffcd7a]" />

                    <div className="space-y-6">

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2 text-[#3a3845]">
                                ورود به حساب کاربری
                            </h2>
                            <p className="text-gray-600">
                                لطفا شماره موبایل خود را وارد کنید
                            </p>
                        </div>

                        {state.status === "error" && (
                            <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg">
                                <p className="text-red-700 text-sm">{state.message}</p>
                            </div>
                        )}

                        {state.status === "success" && (
                            <div className="bg-green-50 border-r-4 border-green-500 p-4 rounded-lg">
                                <p className="text-green-700 text-sm">{state.message}</p>
                            </div>
                        )}

                        <form action={formAction}>
                            <input type="hidden" name="mobile" value={mobile} />

                            <div className="space-y-2">
                                <label
                                    htmlFor="mobile"
                                    className="block text-sm font-semibold mb-3 text-[#3a3845]"
                                >
                                    شماره موبایل
                                </label>

                                <div className="relative">
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#ffd39a]/20 rounded-xl flex items-center justify-center">
                                        <Phone size={20} className="text-[#3a3845]" />
                                    </div>
                                    {
                                        isValid && <CircleCheckBig size={16} className="absolute left-4 bottom-[26px]" color="green" />

                                    }
                                    <input
                                        type="tel"
                                        value={mobile}
                                        onChange={handleMobileChange}
                                        maxLength={11}
                                        placeholder="09123456789"
                                        className={`w-full pr-16 ${isValid ? 'pl-14' : 'pl-4'} py-4 rounded-xl border-2 border-gray-200 focus:border-transparent transition-all text-lg outline-none`}
                                        dir="ltr"
                                    />
                                </div>

                                <p className="text-sm text-gray-500 mt-2">
                                    کد تایید به این شماره ارسال خواهد شد
                                </p>
                            </div>

                            <SubmitButton isValid={isValid} />
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6 leading-relaxed">
                            با ورود و ثبت‌نام،
                            <Link href="/terms-conditions" className="font-semibold mx-1 text-yellow-600 hover:text-[#ffcd7a]">
                                {" شرایط و قوانین" + " "}
                            </Link>
                            استفاده از سرویس‌های سایت را می‌پذیرید
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
