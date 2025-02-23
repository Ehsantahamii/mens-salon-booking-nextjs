"use client"
import CheckOtpForm from "@/components/layout/login/CheckOtpForm";
import LoginForm from "@/components/layout/login/LoginForm";
import { useState } from "react";

const page = () => {
    const [step, setStep] = useState(1);

    return (
        <div>
            {step === 1 && <LoginForm setStep={setStep} />}
            {step === 2 && <CheckOtpForm setStep={setStep}/>}

        </div>
    );
};

export default page;