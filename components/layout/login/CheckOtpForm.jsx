"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Shield, Loader2, X } from "lucide-react";
import { useFormStatus } from "react-dom";
import { checkOtpAction, loginAction } from "@/actions/LoginActions";
import { useRouter } from "next/navigation";

const initialState = {
    status: "",
    message: "",
};

function SubmitButton({ isValid }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={!isValid || pending}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${isValid && !pending
                    ? 'bg-[#ffd39a] text-[#3a3845] shadow-[0_8px_20px_rgba(255,211,154,0.4)] hover:shadow-[0_12px_30px_rgba(255,211,154,0.5)] hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'
                }`}
        >
            {pending ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>در حال بررسی...</span>
                </>
            ) : (
                <span>تأیید کد</span>
            )}
        </button>
    );
}

export default function ModernOtpForm({ mobile, onBack, userPhone, setStep }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isValid, setIsValid] = useState(false);
    const [timer, setTimer] = useState(120);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    const router = useRouter();

    const [state, formAction] = React.useActionState(
        checkOtpAction,
        initialState
    );

    // redirect on success
    useEffect(() => {
        if (state.status === "success") {
            if (state?.data?.profile_status_complete === false) {
                setStep(3);
            } else if (state?.data?.profile_status_complete === true) {
                setTimeout(() => {
                    router.push("/reservation");
                }, 500);
            } else {
                setStep(1);
            }
        }
    }, [state.status]);

    // Countdown
    useEffect(() => {
        if (timer > 0) {
            const i = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(i);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setIsValid(newOtp.every(d => d));
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    // ✅ مدیریت کلیدهای Backspace و Delete
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newOtp = [...otp];

            if (newOtp[index]) {
                // اگر خانه فعلی پر است، آن را پاک کن
                newOtp[index] = "";
                setOtp(newOtp);
                setIsValid(newOtp.every(d => d));
            } else if (index > 0) {
                // اگر خانه خالی است، به خانه قبلی برو و آن را پاک کن
                newOtp[index - 1] = "";
                setOtp(newOtp);
                setIsValid(newOtp.every(d => d));
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "Delete") {
            // پاک کردن خانه فعلی با Delete
            e.preventDefault();
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            setIsValid(newOtp.every(d => d));
        }
    };

    // ✅ پاک کردن همه خانه‌ها
    const handleClearAll = () => {
        setOtp(["", "", "", "", "", ""]);
        setIsValid(false);
        inputRefs.current[0]?.focus();
    };

    const handleResend = async () => {
        if (!canResend) return;
        const fd = new FormData();
        fd.append("mobile", mobile);
        await loginAction({}, fd);
        setTimer(120);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
    };

    // ✅ پیست کردن کد از کلیپ‌بورد
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }

        setOtp(newOtp);
        setIsValid(newOtp.every(d => d));

        // فوکوس روی آخرین خانه پر شده
        const lastFilledIndex = Math.min(pastedData.length, 5);
        inputRefs.current[lastFilledIndex]?.focus();
    };

    return (
        <div dir="rtl" className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#3a3845] via-[#4a4855] to-[#3a3845]">
            <div className="w-full max-w-md relative">
                <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffd39a] to-[#ffcd7a]" />

                    <button
                        onClick={() => setStep(1)}
                        type="button"
                        className="absolute left-6 top-6 w-10 h-10 rounded-full rotate-180 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <form action={formAction} className="space-y-6">
                        <input type="hidden" name="otp" value={otp.join("")} />

                        <div className="text-center mb-8 pt-6">
                            <div className="w-16 h-16 bg-[#ffd39a]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield size={32} className="text-[#ffd39a]" />
                            </div>
                            <h2 className="text-2xl font-bold">کد تایید را وارد کنید</h2>
                            <p className="text-gray-600">کد ارسال شده به {userPhone}</p>
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

                        <div className="space-y-4">
                            <div className="flex flex-row-reverse justify-center gap-2">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        ref={el => inputRefs.current[i] = el}
                                        value={digit}
                                        onChange={e => handleChange(i, e.target.value)}
                                        onKeyDown={e => handleKeyDown(i, e)}
                                        onPaste={i === 0 ? handlePaste : undefined}
                                        className={`w-12 h-12 text-center text-xl border-2 rounded-xl transition-all focus:outline-none ${digit
                                                ? 'border-[#ffd39a] bg-[#ffd39a]/5'
                                                : 'border-gray-300 hover:border-gray-400'
                                            } focus:border-[#ffd39a] focus:ring-2 focus:ring-[#ffd39a]/20`}
                                    />
                                ))}
                            </div>

                            {/* دکمه پاک کردن */}
                            {otp.some(d => d) && (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={handleClearAll}
                                        className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 transition-colors"
                                    >
                                        <X size={16} />
                                        <span>پاک کردن همه</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <SubmitButton isValid={isValid} />

                        <div className="text-center pt-4">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={!canResend}
                                className={`font-semibold transition-colors ${canResend
                                        ? 'text-amber-500 hover:text-amber-600 cursor-pointer'
                                        : 'text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {canResend ? "ارسال مجدد کد" : `ارسال مجدد تا ${timer} ثانیه`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
