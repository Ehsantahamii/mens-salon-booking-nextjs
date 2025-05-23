"use client"
import { checkOtp } from '@/actions/LoginActions';
import { useEffect, useState, useRef, useContext } from 'react';
import { useActionState } from "react";
import { toast } from "react-toastify";
import SubmitBtn from '@/components/module/SubmitBtn';
import { FaArrowCircleLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import ResendOtpBtn from './ResendOtpBtn';
import UserInfoContext from '@/context/UserInfoContext';

const CheckOtpForm = ({ setStep }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [activeBtn, setActiveBtn] = useState(false);

    const inputRefs = useRef([]);
    const [stateOtp, formActionOtp] = useActionState(checkOtp, {});

    const router = useRouter()
    const { saveUserData } = useContext(UserInfoContext)

    useEffect(() => {

        if (stateOtp?.status === "success" && stateOtp?.data !== 0) {
            saveUserData(stateOtp?.data);
            localStorage.setItem("user", JSON.stringify(stateOtp?.data));
            toast.success(`سلام ${"" + stateOtp?.data + "-"}خوش آمدید.`)
            router.push("/reservation");

        } else if (stateOtp?.data == 0) {
            setStep(3)
        } else if (stateOtp?.status === "error") {
            toast(stateOtp?.message, { type: `${stateOtp.status}` });
        }

    }, [stateOtp]);


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
    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <section className="w-[100dvw] h-[90vh] md:h-[90dvh] flex justify-center items-center">
            <div className="w-[90%] max-w-[420px] bg-white flex flex-col justify-center relative items-center min-h-[320px] shadow rounded-xl ">
                <FaArrowCircleLeft color='#333' title='بازگشت' size={20} className='cursor-pointer absolute left-4 top-4' onClick={() => setStep(1)} />
                <h2 className=''>
                    کد تایید را وارد نمایید
                </h2>
                <h3 className=' text-[#333] font-thin py-4'>
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
                                inputMode="numeric"
                                className="w-[2.3rem] h-[2.3rem] sm:w-12 sm:h-12 text-center text-xl border rounded-md"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </div>
                    <input type="hidden" name="otp" id="otp" value={otp.join("")} autoComplete="one-time-code" />
                    <SubmitBtn
                        title="تأیید"
                        style={`text-white px-6 py-2 rounded-md  ${activeBtn ? "bg-orange-400" : ""}`}
                    />

                </form>
                <ResendOtpBtn />
            </div>
        </section>

    )
};

export default CheckOtpForm;
