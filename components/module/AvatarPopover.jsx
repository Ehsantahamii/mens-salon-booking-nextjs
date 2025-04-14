"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useContext, useState } from "react";
import { usePathname } from 'next/navigation'
import UserInfoContext from '@/context/UserInfoContext';
import "./AvatarPopover.css"
import Link from "next/link";
import Image from "next/image";
import LogoutBtn from "./LogoutBtn";
import { IoIosList } from "react-icons/io";
import { TbPlaylistAdd } from "react-icons/tb";
import { GoLaw } from "react-icons/go";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import ChangeUsername from "../layout/login/ChangeUsername";
import ChangeUsernameModal from "./ChangeUsernameModal";
const AvatarPopover = () => {
    const { userData } = useContext(UserInfoContext);
    const pathname = usePathname();
    const [modal, setOpenModal] = useState(false);


    return (
        <>
            {
                modal && <ChangeUsernameModal setOpenModal={setOpenModal} />
            }

            <Popover className="user-popup">
                <PopoverTrigger asChild >
                    <button className="user-btn relative cursor-pointer py-2 text-[1em] hover:">
                        <span className="no-select w-full flex items-center gap-1 ">
                            <Image width={100} height={100} className='w-[28px] h-[28px]' src="/images/avatar.png" alt="avatar" />
                            <p className=" overflow-x-hidden text-nowrap w-[85%]">
                                {
                                    userData ? userData : "درحال دریافت اطلاعات ..."
                                }
                            </p>
                            <IoChevronDownOutline size={18} />
                        </span>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto max-w-[280px] min-w-[150px] p-2 ">
                    <div className="w-full">
                        <div className="w-full flex flex-col pt-2 pb-1 " >
                            {
                                pathname !== "/reserved-list" && <Link href="/reserved-list" className="font-extralight flex items-center gap-2 py-1 transition-opacity opacity-75 hover:opacity-100 " onClick={() => onOpenChange(false)}>
                                    <IoIosList />
                                    نوبت های من
                                </Link>
                            }
                            {
                                pathname !== "/reservation" && <Link href="/reservation" className="font-extralight flex items-center gap-2 py-1 opacity-75 transition-opacity hover:opacity-100 " onClick={() => onOpenChange(false)}>
                                    <TbPlaylistAdd />
                                    رزرو نوبت جدید
                                </Link>
                            }
                            <ChangeUsername setOpenModal={setOpenModal} />
                            {
                                pathname !== "/questions" && <Link href="/questions" className="font-extralight flex items-center gap-2 py-1 border-b-[#333333b4] transition-opacity opacity-75 hover:opacity-100 " onClick={() => onOpenChange(false)}>
                                    <MdOutlineQuestionAnswer />
                                    سوالات متداول
                                </Link>
                            }
                            {
                                pathname !== "/rules" && <Link href="/rules" className="font-extralight flex transition-opacity items-center gap-2 py-1 border-b-[#333333b4] opacity-75 hover:opacity-100 " onClick={() => onOpenChange(false)}>
                                    <GoLaw />
                                    قوانین و مقررات
                                </Link>
                            }
                        </div>
                        <div className="w-full  pb-1 text-red-500 opacity-75 hover:opacity-100  py-1 transition-opacity" >
                            <LogoutBtn />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default AvatarPopover;