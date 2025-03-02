"use client"
import { checkOtp } from '@/actions/LoginActions';
import { useEffect, useState, useRef, useContext } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import SubmitBtn from '@/components/module/SubmitBtn';
import { FaArrowCircleLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import ReservedContext from '@/context/ReservedContext';
const CheckOtpForm = ({ setStep }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [stateOtp, formActionOtp] = useFormState(checkOtp, {});

    const router = useRouter()

    useEffect(() => {
        toast(stateOtp?.message, { type: `${stateOtp.status}` });

        if (stateOtp?.status === "success" && stateOtp?.data == 1) {
            router.push("/reservation");

        } else if (stateOtp?.data == 0) {
            setStep(3)
        }

    });
    console.log(stateOtp)


    const handleChange = (index, value) => {

        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    return (
        <section className="w-[100dvw] h-[90vh] md:h-svh flex justify-center items-center">
            <div className="w-[90%] max-w-[420px] flex flex-col justify-center relative items-center min-h-[320px] shadow rounded-xl ">
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
                                maxLength="1"
                                className="w-[2.3rem] h-[2.3rem] sm:w-12 sm:h-12 text-center text-xl border rounded-md"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </div>
                    <input type="hidden" name="otp" id="otp" value={otp.join("")} />
                    <SubmitBtn
                        title="تأیید"
                        style="text-white px-6 py-2 rounded-md"
                    />

                </form>
            </div>
        </section>

    )
};

export default CheckOtpForm;
