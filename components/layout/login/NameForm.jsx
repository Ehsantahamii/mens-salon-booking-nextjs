"use client";

import React, { useState, useEffect } from "react";
import { User, AlertCircle, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { sendUserName } from "@/actions/LoginActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 mt-8 ${isValid && !pending
                ? "bg-[#ffd39a] text-[#3a3845] shadow-[0_8px_20px_rgba(255,211,154,0.4)] hover:shadow-[0_12px_30px_rgba(255,211,154,0.5)] hover:-translate-y-0.5"
                : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
                }`}
        >
            {pending ? (
                <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    در حال ارسال...
                </span>
            ) : (
                "ارسال و ادامه"
            )}
        </button>
    );
}

export default function ModernNameForm() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isValid, setIsValid] = useState(false);

    const router = useRouter()

    const [state, formAction] = React.useActionState(
        sendUserName,
        initialState
    );
    console.log(state)

    useEffect(() => {
        setIsValid(name.trim().length > 0 && lastName.trim().length > 0);
    }, [name, lastName]);

    useEffect(() => {
        if (state.status === "success") {
            router.push("/reservation")
            toast.success("خوش آمدید")
        }
    }, [state]);

    return (
        <div
            dir="rtl"
            className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#3a3845] via-[#4a4855] to-[#3a3845]"
        >
            <form action={formAction} className="w-full max-w-md relative">
                {/* hidden inputs برای ارسال داده‌ها */}
                <input type="hidden" name="name" value={name} />
                <input type="hidden" name="last_name" value={lastName} />

                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ffd39a] rounded-full opacity-10" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#ffd39a] rounded-full opacity-10" />
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffd39a] to-[#ffcd7a]" />

                    <div className="space-y-6">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#ffd39a]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <User size={32} className="text-[#ffd39a]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-[#3a3845]">
                                تکمیل اطلاعات
                            </h2>
                            <p className="text-gray-600">
                                لطفا نام و نام خانوادگی خود را وارد کنید
                            </p>
                        </div>

                        {/* Name */}
                        <div className="relative">
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#ffd39a]/20 rounded-xl flex items-center justify-center">
                                <User size={20} className="text-[#3a3845]" />
                            </div>
                            <input
                                type="text"
                                maxLength={20}
                                placeholder="نام"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full pr-16 pl-4 py-4 rounded-xl border-2 border-gray-200 text-lg outline-none transition-all ${name && "shadow-[0_0_0_3px_rgba(255,211,154,0.2)]"
                                    }`}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="relative">
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#ffd39a]/20 rounded-xl flex items-center justify-center">
                                <User size={20} className="text-[#3a3845]" />
                            </div>
                            <input
                                type="text"
                                maxLength={20}
                                placeholder="نام خانوادگی"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`w-full pr-16 pl-4 py-4 rounded-xl border-2 border-gray-200 text-lg outline-none transition-all ${lastName &&
                                    "shadow-[0_0_0_3px_rgba(255,211,154,0.2)]"
                                    }`}
                            />
                        </div>

                        {/* Warning */}
                        <div className="flex items-start gap-2 p-3 bg-rose-50 rounded-xl border border-rose-100">
                            <AlertCircle
                                size={18}
                                className="text-rose-500 mt-0.5 flex-shrink-0"
                            />
                            <p className="text-sm text-rose-600 leading-relaxed">
                                ثبت نوبت شما براساس نام و نام خانوادگی وارد شده انجام می‌گیرد.
                            </p>
                        </div>

                        {/* Error */}
                        {state.status === "error" && (
                            <p className="text-sm text-red-600 text-center">
                                {state.message}
                            </p>
                        )}

                        <SubmitButton isValid={isValid} />
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-white/60 text-sm">
                        طراحی شده توسط
                        <a
                            href="https://varna-web.ir"
                            className="font-semibold mx-1 text-[#ffd39a] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Varna-web.ir
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}
