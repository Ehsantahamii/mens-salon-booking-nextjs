"use client";
import { Home, ArrowRight, Search, Map } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-liteGold/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-semiLiteGold/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-liteGold/5 to-semiLiteGold/5 rounded-full blur-3xl" />
            </div>

            <div className={`max-w-2xl w-full relative transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* 404 Animation Container */}
                <div className="relative mb-8">
                    {/* Animated 404 */}
                    <div className="text-center mb-6">
                        <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-r from-liteGold via-semiLiteGold to-liteGold leading-none select-none animate-pulse">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-liteGold/20 to-semiLiteGold/20 rounded-full blur-2xl animate-pulse" />
                        </div>
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute top-10 right-10 sm:right-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center rotate-12">
                            <Search className="text-liteGold" size={24} />
                        </div>
                    </div>
                    <div className="absolute top-10 left-10 sm:left-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center -rotate-12">
                            <Search className="text-liteGold" size={24} />
                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 sm:p-12 relative overflow-hidden">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-liteGold via-semiLiteGold to-liteGold" />

                    {/* Text Content */}
                    <div className="text-center space-y-4 mb-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                            صفحه یافت نشد
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
                            متأسفانه صفحه مورد نظر شما در دسترس نیست یا حذف شده است.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => router.push('/reservation')}
                            className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-liteGold to-semiLiteGold text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <Home size={22} />
                            <span>بازگشت به صفحه اصلی</span>
                        </button>

                        <button
                            onClick={() => router.back()}
                            className="group w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-lg hover:border-liteGold hover:bg-liteGold/5 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <ArrowRight size={22} className="group-hover:-translate-x-1 transition-transform" />
                            <span>صفحه قبل</span>
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-10 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 text-center mb-4">
                            یا می‌توانید از لینک‌های زیر استفاده کنید:
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => router.push('/reservation')}
                                className="px-4 py-2 bg-gray-100 hover:bg-liteGold/10 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                رزرو نوبت
                            </button>
                            <button
                                onClick={() => router.push('/reserved-list')}
                                className="px-4 py-2 bg-gray-100 hover:bg-liteGold/10 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                نوبت‌های من
                            </button>
                            <button
                                onClick={() => router.push('/questions')}
                                className="px-4 py-2 bg-gray-100 hover:bg-liteGold/10 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                سوالات متداول
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Text */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        در صورت نیاز به راهنمایی، لطفاً با{" "}
                        <button
                            onClick={() => router.push('/support')}
                            className="text-liteGold hover:text-semiLiteGold font-semibold underline"
                        >
                            پشتیبانی
                        </button>
                        {" "}تماس بگیرید.
                    </p>
                </div>
            </div>
        </div>
    );
}