"use client"
import { checkOtp } from '@/actions/LoginActions';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from "react-dom";
import toast from 'react-hot-toast';
import SubmitBtn from '@/components/module/submitBtn';
import { FaArrowCircleLeft } from "react-icons/fa";
const CheckOtpForm = ({ setStep }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const [stateOtp, formActionOtp] = useFormState(checkOtp, {});
    console.log(stateOtp)

    const router = useRouter()

 
    useEffect(() => {
        if (stateOtp.status === "success") {
            toast.success(stateOtp.message);
            router.push("/reservation");

        }
        if (stateOtp.status === "error") {
            toast.error(stateOtp.message);

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
    };

    return (
        <section className="w-[100dvw] h-screen flex justify-center items-center">
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
                                className="w-12 h-12 text-center text-xl border rounded-md"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </div>
                    <input type="hidden" name="otp" id="otp" value={otp.join("")} />
                    <SubmitBtn
                        title="تأیید"
                        style="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
                    />

                </form>
            </div>
        </section>

    )
};

export default CheckOtpForm;
