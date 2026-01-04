"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Suspense, useContext, useState } from "react";
import { usePathname } from 'next/navigation'
import UserInfoContext from '@/context/UserInfoContext';
import Link from "next/link";
import Image from "next/image";
import LogoutBtn from "./LogoutBtn";
import { List, PlusCircle, Scale, HelpCircle, ChevronDown } from "lucide-react";
import ChangeUsername from "../layout/login/ChangeUsername";
import ChangeUsernameModal from "./ChangeUsernameModal";

const AvatarPopover = () => {
    const { userData } = useContext(UserInfoContext);
    const pathname = usePathname();
    const [modal, setOpenModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* مودال در سطح بالا - خارج از Popover */}
            {modal && (
                <Suspense fallback={
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl mx-4">
                            <div className="animate-spin w-8 h-8 border-4 border-liteGold border-t-transparent rounded-full mx-auto"></div>
                            <p className="text-gray-600 text-sm mt-4">در حال بارگذاری...</p>
                        </div>
                    </div>
                }>
                    <ChangeUsernameModal setOpenModal={setOpenModal} />
                </Suspense>
            )}

            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <button className="relative cursor-pointer group">
                        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-liteGold/10 hover:to-semiLiteGold/10 border border-gray-200 hover:border-liteGold/30 transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="relative">
                                <Image
                                    width={28}
                                    height={28}
                                    className='w-7 h-7 sm:w-8 sm:h-8 rounded-full ring-2 ring-liteGold/20 group-hover:ring-liteGold/50 transition-all'
                                    src="/images/avatar.png"
                                    alt="avatar"
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5 max-w-[80px] xs:max-w-[100px] sm:max-w-[120px] md:max-w-[180px]">
                                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                    {userData ? userData : "..."}
                                </p>
                                <ChevronDown
                                    className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                    size={14}
                                />
                            </div>
                        </div>
                    </button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-[calc(100vw-2rem)] max-w-[320px] sm:max-w-[380px] p-0 shadow-xl border border-gray-200 rounded-2xl overflow-hidden"
                    align="end"
                    sideOffset={8}
                >
                    <div className="w-full">
                        {/* Header با اطلاعات کاربر */}
                        <div className="relative overflow-hidden bg-gradient-to-r from-liteGold to-semiLiteGold p-4 sm:p-5">
                            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-xl" />

                            <div className="relative flex items-center gap-2.5 sm:gap-3">
                                <div className="relative flex-shrink-0">
                                    <Image
                                        width={48}
                                        height={48}
                                        className='w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-4 ring-white/30 shadow-lg'
                                        src="/images/avatar.png"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#333]/90 font-bold text-base sm:text-lg truncate">
                                        {userData || "کاربر"}
                                    </p>
                                    <p className="text-[#333]/70 text-xs sm:text-sm mt-0.5 sm:mt-1">
                                        کاربر عادی
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* منوها */}
                        <div className="p-2.5 sm:p-3 space-y-1.5 sm:space-y-2">
                            {pathname !== "/reserved-list" && (
                                <Link
                                    href="/reserved-list"
                                    onClick={() => setIsOpen(false)}
                                    className="group relative w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-liteGold/10 hover:to-semiLiteGold/10 border border-gray-200 hover:border-liteGold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                                        <List className="text-white" size={16} />
                                    </div>
                                    <div className="flex-1 text-right min-w-0">
                                        <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                                            نوبت‌های من
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                                            مشاهده رزروهای فعال
                                        </p>
                                    </div>
                                </Link>
                            )}

                            {pathname !== "/reservation" && (
                                <Link
                                    href="/reservation"
                                    onClick={() => setIsOpen(false)}
                                    className="group relative w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-liteGold/10 hover:to-semiLiteGold/10 border border-gray-200 hover:border-liteGold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                                        <PlusCircle className="text-white" size={16} />
                                    </div>
                                    <div className="flex-1 text-right min-w-0">
                                        <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                                            رزرو نوبت جدید
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                                            دریافت نوبت جدید
                                        </p>
                                    </div>
                                </Link>
                            )}

                            {/* تغییر نام کاربری */}
                            <div className="group relative w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-liteGold/10 hover:to-semiLiteGold/10 border border-gray-200 hover:border-liteGold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
                                <ChangeUsername
                                    setOpenModal={setOpenModal}
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>

                            {pathname !== "/questions" && (
                                <Link
                                    href="/questions"
                                    onClick={() => setIsOpen(false)}
                                    className="group relative w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-liteGold/10 hover:to-semiLiteGold/10 border border-gray-200 hover:border-liteGold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                                        <HelpCircle className="text-white" size={16} />
                                    </div>
                                    <div className="flex-1 text-right min-w-0">
                                        <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                                            سوالات متداول
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                                            پاسخ به سوالات رایج
                                        </p>
                                    </div>
                                </Link>
                            )}

                            {pathname !== "/terms-conditions" && (
                                <Link
                                    href="/terms-conditions"
                                    onClick={() => setIsOpen(false)}
                                    className="group relative w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-liteGold/10 hover:to-semiLiteGold/10 border border-gray-200 hover:border-liteGold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                                        <Scale className="text-white" size={16} />
                                    </div>
                                    <div className="flex-1 text-right min-w-0">
                                        <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                                            قوانین و مقررات
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                                            شرایط استفاده از خدمات
                                        </p>
                                    </div>
                                </Link>
                            )}
                        </div>

                        {/* دکمه خروج */}
                        <div className="border-t border-gray-100 p-2.5 sm:p-3">
                            <LogoutBtn />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default AvatarPopover;