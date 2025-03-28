"use client"
import { checkOtp } from '@/actions/LoginActions';
import { useEffect, useState, useRef } from 'react';
import { useActionState } from "react";
import { toast } from "react-toastify";
import SubmitBtn from '@/components/module/SubmitBtn';
import { FaArrowCircleLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
const CheckOtpForm = ({ setStep }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [activeBtn, setActiveBtn] = useState(false);

    const inputRefs = useRef([]);
    const [stateOtp, formActionOtp] = useActionState(checkOtp, {});

    const router = useRouter()

    useEffect(() => {
        toast(stateOtp?.message, { type: `${stateOtp.status}` });

        if (stateOtp?.status === "success" && stateOtp?.data == 1) {
            router.push("/reservation");

        } else if (stateOtp?.data == 0) {
            setStep(3)
        }

    });


    const handleChange = (index, value) => {

        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        if (index == 5) {
            setActiveBtn(true)
        } else if (index < 5) {
            setActiveBtn(false)
        }

    };

    // useEffect(() => {
    //     // Check if the browser supports OTP autofill
    //     if ("OTPCredential" in window) {
    //         window.navigator.credentials.get({
    //             otp: { transport: ["sms"] }, // Request OTP from SMS
    //             signal: new AbortController().signal, // Ensure proper cancellation
    //         }).then((otpCredential) => {
    //             if (otpCredential && otpCredential.code) {
    //                 const receivedOtp = otpCredential.code.split(""); // Convert OTP string to array
    //                 setOtp(receivedOtp);
    //                 receivedOtp.forEach((num, index) => {
    //                     if (inputRefs.current[index]) {
    //                         inputRefs.current[index].value = num; // Autofill the inputs
    //                     }
    //                 });
    //             }
    //         }).catch((err) => console.error("OTP Auto-fill failed", err));
    //     }

    //     // Automatically focus the first input on component mount
    //     if (inputRefs.current[0]) {
    //         inputRefs.current[0].focus();
    //     }
    // }, []);
    return (
        <section className="w-[100dvw] h-[90vh] md:h-[90dvh] flex justify-center items-center">
            <div className="w-[90%] max-w-[420px] bg-white flex flex-col justify-center relative items-center min-h-[320px] shadow rounded-xl ">
                <FaArrowCircleLeft color='#333' title='بازگشت' size={20} className='cursor-pointer absolute left-4 top-4' onClick={() => setStep(1)} />
                <h2 className='text-[26px]'>
                    کد تایید را وارد نمایید
                </h2>
                <h3 className='text-[16px] text-[#333] font-thin py-4'>
                    کد ارسال شده را وارد نمایید
                </h3>
                <form className="w-[90%] mx-auto gap-6 flex flex-col justify-center items-center" action={formActionOtp}>
                    <div className="flex space-x-2 justify-center flex-row-reverse">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                autoComplete="one-time-code"
                                maxLength="1"
                                className="w-[2.3rem] h-[2.3rem] sm:w-12 sm:h-12 text-center text-xl border rounded-md"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </div>
                    <input type="hidden" name="otp" id="otp" value={otp.join("")}  autoComplete="one-time-code"/>
                    <SubmitBtn
                        title="تأیید"
                        style={`text-white px-6 py-2 rounded-md  ${activeBtn ? "bg-orange-400" : ""}`}
                    />

                </form>
            </div>
        </section>

    )
};

export default CheckOtpForm;
