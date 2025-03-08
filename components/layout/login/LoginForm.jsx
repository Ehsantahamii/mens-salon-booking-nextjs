"use client"

import { login } from "@/actions/LoginActions";
import SubmitBtn from "@/components/module/SubmitBtn";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoIosCall } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { toast } from "react-toastify";

const LoginForm = ({ setStep }) => {
    const [stateMobile, formActionMobile] = useFormState(login, {});
    const [activeBtn, setActiveBtn] = useState(false);
    function isBtnActive(e) {
        const change = e.target.value
        if (change.length == 11) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);

        }

    }

    useEffect(() => {
        toast(stateMobile?.data, { type: `${stateMobile.status}` });
        if (stateMobile.status === "success") {
            setStep(2)
        }
    });
    return (
        <section className="w-[100dvw] h-[90vh] md:h-svh flex gap-8 justify-center items-center">
            <div className="w-[85%] bg-white flex flex-col justify-between p-2 max-w-[380px] min-h-[320px] shadow rounded-xl ">
                <h1 className="text-[24px] font-semibold py-4 text-center">
                    سامانه رزرو نوبت
                </h1>

                <form className="w-[85%] mx-auto gap-6 flex flex-col justify-center items-center" action={formActionMobile}>
                    <div className="flex flex-col w-full relative">
                        <IoIosCall className="absolute left-4 bottom-3 opacity-50" color="#0e0e0e" size={18} />
                        <label htmlFor="mobile" className="text-[18px] font-normal py-2">
                            تلفن همراه خود را وارد نمایید.
                        </label>
                        <input className="w-full border-navColor bg-orange-50 rou border-[1px] max-w-[300px] py-2 px-4 rounded-xl"
                            maxLength={11}
                            type="text" name="mobile" id="mobile" placeholder="09100000000" onChange={isBtnActive} />
                    </div>
                    <SubmitBtn title="ارسال کد تایید" activeBtn={activeBtn} style={`text-white px-6 py-2 rounded-md  ${activeBtn ? "bg-orange-400" : ""}`} />
                </form>
                <p className="text-[10px] py-1 text-center">
                    طراحی شده توسط
                    <Link className="px-1" href="https://developmart.ir/">
                        Developmart.ir
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default LoginForm;