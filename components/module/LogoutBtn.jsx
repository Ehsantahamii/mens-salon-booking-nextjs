"use client"
import { logout } from "@/actions/LoginActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";

const LogoutBtn = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const response = await logout();
            setData(response);
        } catch (error) {
            toast.error("خطا در خروج از حساب کاربری");
            console.log(error)
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (data) {
            if (data.status === "success") {
                toast.success(data.message || "با موفقیت خارج شدید");
                // بستن تمام popover ها قبل از redirect
                document.body.click();
                // کمی تاخیر برای بسته شدن popover
                setTimeout(() => {
                    router.push("/");
                    router.refresh(); // رفرش کردن صفحه برای پاک کردن state
                }, 100);
            } else {
                toast.error(data.message);
                setIsLoading(false);
            }
        }
    }, [data, router]);

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className="group relative w-full flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 border border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <LogOut className="text-white" size={16} />
                )}
            </div>
            <div className="flex-1 text-right min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-red-700 group-hover:text-red-800 transition-colors truncate">
                    {isLoading ? "در حال خروج..." : "خروج از حساب"}
                </p>
                <p className="text-[10px] sm:text-xs text-red-500 mt-0.5 truncate">
                    خروج از حساب کاربری
                </p>
            </div>
        </button>
    );
};

export default LogoutBtn;
