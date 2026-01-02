"use client"
import { getReserveTimes, sendReserveData, sendReserveTime } from "@/actions/ReserveActions";
import CheckOtpForm from "@/components/layout/login/CheckOtpForm";
import LoginForm from "@/components/layout/login/LoginForm";
import NameForm from "@/components/layout/login/NameForm";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const LoginPage = () => {
    const [step, setStep] = useState(1);
    const [userPhone, setUserPhone] = useState("");


    const router = useRouter()


    return (
        <>

            <Suspense fallback={
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 shadow-xl">
                        <div className="animate-spin w-8 h-8 border-4 border-liteGold border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-gray-600 text-sm mt-4">در حال بارگذاری...</p>
                    </div>
                </div>
            }>
                {step === 1 && <LoginForm setStep={setStep} setUserPhone={setUserPhone} />}
                {step === 2 && <CheckOtpForm setStep={setStep} userPhone={userPhone} />}
                {step === 3 && <NameForm setStep={setStep} />}
            </Suspense>
        </>
    );
};

export default LoginPage;



