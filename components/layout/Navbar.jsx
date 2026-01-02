"use client"
import Link from 'next/link';
import AvatarPopover from '../module/AvatarPopover';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    const renderNavBtn = () => {
        if (pathname === "/" || pathname === "/login") {
            return null;
        } else {
            return (
                <nav className="w-full h-20 flex justify-center items-center bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
                    <div className='w-[85%] flex items-center justify-between mx-auto'>
                        <div className='flex items-center gap-3'>
                            {/* <div className='w-10 h-10 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-xl flex items-center justify-center shadow-md'>
                                <span className='text-white font-bold text-lg'>ن</span>
                            </div> */}
                            <h1 className='font-bold text-sm min-[350px]:text-base lg:text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                                سامانه رزرو نوبت آنلاین
                            </h1>
                        </div>
                        <div className='flex items-center gap-4'>
                            <AvatarPopover />
                        </div>
                    </div>
                </nav>
            );
        }
    }

    return (
        <>
            {renderNavBtn()}
        </>
    );
};

export default Navbar;
