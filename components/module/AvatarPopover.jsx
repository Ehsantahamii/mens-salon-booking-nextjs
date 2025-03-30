"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useContext } from "react";
import { usePathname } from 'next/navigation'
import UserInfoContext from '@/context/UserInfoContext';
import "./AvatarPopover.css"
import Link from "next/link";
import Image from "next/image";
import LogoutBtn from "./LogoutBtn";
const AvatarPopover = () => {
    const { userData } = useContext(UserInfoContext);
    const pathname = usePathname();

    console.log(userData)
    return (
        <Popover className="user-popup">
            <PopoverTrigger asChild >
                <button className="px-4 py-3 bg-liteGold rounded-md">
                    حساب کاربری
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto max-w-[220px] min-w-[150px] p-2">
                <div className="w-full">
                    <div className="flex justify-between  gap-1 items-stretch py-2 border-b-[#030303] border-b text-[18px]">
                        <Image width={100} height={100} className='w-[25px] h-[25px]' src="/images/avatar.png" alt="avatar" />
                        <p className="overflow-x-hidden text-nowrap w-[75%]">
                            {
                                userData ? userData : "کاربر نامشخص"
                            }
                        </p>
                    </div>
                    <div className="w-full pt-2 pb-1 opacity-75 hover:opacity-100 transition-opacity" >
                        {
                            pathname !== "/reserved-list" && <Link href="/reserved-list" onClick={() => onOpenChange(false)}>نوبت های من</Link>
                        }
                        {
                            pathname !== "/reservation" && <Link href="/reservation" onClick={() => onOpenChange(false)}>رزرو نوبت جدید</Link>
                        }
                    </div>
                    <div className="w-full pt-2 pb-1 text-red-500 opacity-75 hover:opacity-100 transition-opacity" >
                        <LogoutBtn />
                    </div>
                </div>
            </PopoverContent>
        </Popover>);
};

export default AvatarPopover;