"use client"
import { getReserveTimes, sendReserveData, sendReserveTime } from "@/actions/ReserveActions";
import CheckOtpForm from "@/components/layout/login/CheckOtpForm";
import LoginForm from "@/components/layout/login/LoginForm";
import NameForm from "@/components/layout/login/NameForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";

const MainPage = () => {
    const [step, setStep] = useState(1);
    const [stateReserveData, formActionReserveData] = useActionState(sendReserveData, {});
    const [stateGetTimes, formActionGetTimes] = useActionState(getReserveTimes, {});
    const [stateSendTime, formActionSendTime] = useActionState(sendReserveTime, {});


    const router = useRouter()


    useEffect(() => {
        if (stateReserveData.loginStatus || stateGetTimes.loginStatus || stateSendTime.loginStatus === false) {
            toast.error("حساب کاربری شما منقضی شده است لطفا دوباره وارد شوید.")
            router.push("/")
        }
    });

    return (
        <div>
            {step === 1 && <LoginForm setStep={setStep} />}
            {step === 2 && <CheckOtpForm setStep={setStep} />}
            {step === 3 && <NameForm setStep={setStep} />}

        </div>
    );
};

export default MainPage;