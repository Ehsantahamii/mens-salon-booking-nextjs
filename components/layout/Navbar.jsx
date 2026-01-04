"use client"
import AvatarPopover from '../module/AvatarPopover';
import { usePathname } from 'next/navigation';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    const pathname = usePathname();

    // صفحاتی که نباید Navbar نمایش داده شود
    if (pathname === "/" || pathname === "/login") {
        return null;
    }

    return (
        <nav className="w-full h-16 xs:h-18 sm:h-20 flex justify-center items-center bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className='w-[90%] xs:w-[85%] flex items-center justify-between mx-auto'>
                {/* Logo & Title */}
                <div className='flex items-center gap-2 xs:gap-2.5 sm:gap-3'>
                    {/* Logo Icon */}
                    <div className='w-9 h-9 xs:w-10 xs:h-10 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-lg xs:rounded-xl flex items-center justify-center shadow-md flex-shrink-0'>
                        <Calendar className='text-white' size={18} />
                    </div>

                    {/* Title */}
                    <h1 className='font-bold text-xs min-[350px]:text-sm sm:text-base lg:text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight'>
                        <span className='hidden min-[400px]:inline'>سامانه رزرو نوبت آنلاین</span>
                        <span className='inline min-[400px]:hidden'>رزرو آنلاین</span>
                    </h1>
                </div>

                {/* User Menu */}
                <div className='flex items-center'>
                    {
                        pathname === "/terms-conditions" ?
                            <Link href="/">
                                بازگشت
                            </Link>
                            :
                            <AvatarPopover />
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;