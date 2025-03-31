"use client"

import { sendUserName } from "@/actions/LoginActions";
import SubmitBtn from "@/components/module/SubmitBtn";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from 'next/navigation';

import { IoIosCall } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import { toast } from "react-toastify";
import UserInfoContext from '@/context/UserInfoContext';

const NameForm = ({ setStep }) => {
    const [stateUserName, formActionUserName] = useActionState(sendUserName, {});
    const [activeBtn, setActiveBtn] = useState(false);

    const router = useRouter()
    const { saveUserData } = useContext(UserInfoContext)


    function isBtnActive(e) {
        const change = e.target.value
        if (change.length > 0) {
            setActiveBtn(true);
        } else {
            setActiveBtn(false);

        }

    }
    useEffect(() => {
        if (stateUserName.status === "success") {
            saveUserData(stateUserName?.data);
            localStorage.setItem("user", JSON.stringify(stateUserName?.data));
            router.push("/reservation");
            toast.success(`سلام ${stateUserName?.data}خوش آمدید.`)
        } else if (stateUserName.status === "error") {
            toast(stateUserName?.message, { type: `${stateUserName.status}` });
        }
    });
    return (
        <section className="w-[100dvw] h-[90vh] md:h-svh flex gap-8 justify-center items-center">
            <div className="w-[85%] bg-white flex flex-col justify-between pt-12 px-4 max-w-[380px] min-h-[180px] shadow rounded-xl ">
                <form className="w-[85%] mx-auto gap-6 flex flex-col justify-center items-center" action={formActionUserName}>
                    <div className="flex flex-col w-full relative">
                        <MdPerson className="absolute left-4 bottom-[3rem] min-[340px]:bottom-[2rem] opacity-50" />
                        <label htmlFor="mobile" className="text-[18px] font-normal pb-2">
                            نام و نام خانوادگی خود را وارد نمایید.
                        </label>
                        <input className="w-full border-navColor bg-orange-50 rou border-[1px] max-w-[300px] py-2 px-4 rounded-xl"
                            maxLength={20}
                            type="text" name="name" id="name" placeholder="نام و نام خانوادگی" onChange={isBtnActive} />
                        <p className="text-[10px] pt-1 pr-1 opacity-70">
                            ثبت نوبت شما براساس نام و نام خانوادگی وارد شده انجام می گیرد.
                        </p>
                    </div>
                    <SubmitBtn title="ارسال" activeBtn={activeBtn} style={`text-white px-6 py-2 rounded-md  ${activeBtn ? "bg-orange-400" : ""}`} />
                </form>
                <p className="text-[10px] pb-2 pt-4 text-center">
                    طراحی شده توسط
                    <Link className="px-1" href="https://developmart.ir/">
                        Developmart.ir
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default NameForm;