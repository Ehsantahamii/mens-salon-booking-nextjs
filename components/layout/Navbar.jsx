"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const pathname = usePathname();
    const renderNavBtn = () => {
        if (pathname === "/") {
            return null;

        } else if (pathname === "/reserved-list") {
            return (
                <Link className='px-4 py-3 bg-liteGold rounded-md ' href="/reservation" >
                    رزرو نوبت
                </Link>
            );

        } else {
            return (
                <Link className='px-4 py-3 bg-liteGold rounded-md ' href="/reserved-list" >
                    نوبت های من
                </Link>
            );
        }
    }
    return (
        <nav className="w-full h-20 flex justify-center items-center bg-white shadow-sm">
            <div className='w-[85%] flex items-center justify-center mx-auto'>
                <div className='w-[70%] font-bold'>
                    LOGO
                </div>
                <div className='w-[30%] flex justify-end'>

                    {
                        renderNavBtn()
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;