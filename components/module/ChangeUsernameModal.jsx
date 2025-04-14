"use client"

import { sendUserName } from "@/actions/LoginActions";
import { cancelReserved } from "@/actions/ReserveActions";
import UserInfoContext from "@/context/UserInfoContext";
import { useContext, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";

const ChangeUsernameModal = ({ setOpenModal }) => {
    const [stateChangeUsername, formActionChangeUsername, isPending] = useActionState(sendUserName, {});
    console.log(stateChangeUsername)

    const { saveUserData } = useContext(UserInfoContext)

    useEffect(() => {
        isPending && toast.loading("در حال تغییر نام ...")
        !isPending && toast.dismiss()
    }, [isPending]);

    useEffect(() => {
        if (stateChangeUsername.status) {
            setOpenModal(false);
        }
        if (stateChangeUsername.status === "success") {
            toast.success("نام و نام خانوادگی با موفقیت تغییر کرد.");
            localStorage.setItem("user", JSON.stringify(stateChangeUsername?.data));
            saveUserData(stateChangeUsername?.data);
        } else if (stateChangeUsername.status === "error") {
            toast(stateChangeUsername?.message, { type: `${stateChangeUsername.status}` });
        }
    }, [stateChangeUsername]);

    return (
        <div className="modal-2 fixed z-[9999] inset-0 flex  items-center justify-center bg-black bg-opacity-70">
            <div className="w-[85vw] relative p-4 max-w-[420px] h-[180px] bg-white shadow rounded-lg ">
                <img className="w-[32px] absolute top-[-7px] left-[-14px] hover:scale-105 transition-all cursor-pointer"
                    src="/images/cancel-close-svgrepo-com.svg"
                    alt="cancel-icon"
                    onClick={() => setOpenModal(false)} />
                <form action={formActionChangeUsername} className="w-[90%] mx-auto flex justify-center items-center flex-col gap-4 ">
                    <label htmlFor="change-name">نام و نام خانوادگی جدید را وارد کنید.</label>
                    <input className="w-full mt-2 px-4 py-2 shadow" type="text" name="name" id="change-name" placeholder="نام جدید" maxLength={25} />
                    {
                        isPending ? (
                            <div className="text-center">
                                <div
                                    className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-liteGold mx-auto"
                                ></div>
                            </div>

                        ) : (
                            <button className="max-w-[150px] mx-auto px-4 py-2 hover:bg-liteGold  bg-semiLiteGold transition-colors rounded-lg">
                                تغییر نام
                            </button>

                        )
                    }
                </form>
            </div>
        </div >
    );
};

export default ChangeUsernameModal;