"use client"

import { resendOtp } from "@/actions/LoginActions";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";

const ResendOtpBtn = () => {
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(1);
    const [stateResendOtp, formActionResendOtp, isPending] = useActionState(resendOtp, {});

    useEffect(() => {
        toast(stateResendOtp?.data, { type: `${stateResendOtp.status}` });
        if (stateResendOtp?.status === 'success') {
            setMinutes(2);
            setSeconds(1);
            toast.success("کد ورود مجدداً ارسال شد.")

        }

    }, [stateResendOtp]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    return (
        <div className="flex justify-start pt-2 opacity-60">
            {
                seconds > 0 || minutes > 0 ?
                    (
                        <div >
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </div>
                    )
                    :
                    (
                        <form action={formActionResendOtp} >
                            {
                                isPending ? (<p className="text-[12px]">در حال ارسال مجدد کد ...</p>) :
                                    (
                                        <button type="submit" className="text-[12px] opacity-70 hover:opacity-100"> ارسال مجدد کد ...</button>
                                    )
                            }
                        </form >
                    )
            }
        </div >
    );
};

export default ResendOtpBtn;