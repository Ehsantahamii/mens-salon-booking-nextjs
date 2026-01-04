"use client";
import { AlertTriangle, RefreshCw, Home, ArrowRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function ErrorPage({ error, reset }) {
    const [mounted, setMounted] = useState(false);
    const [errorDetails, setErrorDetails] = useState(false);

    useEffect(() => {
        setMounted(true);
        console.error('Error caught by error boundary:', error);
    }, [error]);

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-3 xs:px-4 py-6 xs:py-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-60 xs:w-80 h-60 xs:h-80 bg-red-200/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-72 xs:w-96 h-72 xs:h-96 bg-orange-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] xs:w-[600px] h-[400px] xs:h-[600px] bg-gradient-to-r from-red-100/10 to-orange-100/10 rounded-full blur-3xl" />
            </div>

            <div className={`max-w-2xl w-full relative transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Error Icon Animation */}
                <div className="relative mb-6 xs:mb-8 flex justify-center">
                    <div className="relative">
                        {/* Pulsing Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse" />

                        {/* Main Icon */}
                        <div className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce" style={{ animationDuration: '2s' }}>
                            <AlertTriangle className="text-white" size={48} strokeWidth={2} />
                        </div>

                        {/* Rotating Ring */}
                        <div className="absolute inset-0 border-4 border-red-300/30 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl xs:rounded-3xl shadow-2xl border border-gray-200/50 p-6 xs:p-8 sm:p-12 relative overflow-hidden">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 xs:h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

                    {/* Text Content */}
                    <div className="text-center space-y-3 xs:space-y-4 mb-8 xs:mb-10">
                        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 xs:mb-3 px-2">
                            خطایی رخ داده است
                        </h2>
                        <p className="text-base xs:text-lg sm:text-xl text-gray-600 leading-relaxed max-w-md mx-auto px-2">
                            متأسفانه در پردازش درخواست شما مشکلی پیش آمده است.
                        </p>

                        {/* Error Message */}
                        {error?.message && (
                            <div className="mt-4 xs:mt-6 p-3 xs:p-4 bg-red-50 border border-red-200 rounded-xl mx-2">
                                <p className="text-xs xs:text-sm text-red-600 font-medium break-words">
                                    {error.message}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 xs:gap-4 justify-center items-stretch xs:items-center">
                        <button
                            onClick={reset}
                            className="group w-full xs:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold text-base xs:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={20} className="xs:w-[22px] xs:h-[22px] group-hover:rotate-180 transition-transform duration-500" />
                            <span>تلاش مجدد</span>
                        </button>

                        <button
                            onClick={() => window.location.href = '/reservation'}
                            className="group w-full xs:w-auto px-6 xs:px-8 py-3 xs:py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold text-base xs:text-lg hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Home size={20} className="xs:w-[22px] xs:h-[22px]" />
                            <span>صفحه اصلی</span>
                        </button>
                    </div>

                    {/* Additional Actions */}
                    <div className="mt-8 xs:mt-10 pt-6 xs:pt-8 border-t border-gray-200">
                        <div className="flex flex-col xs:flex-row justify-center items-center gap-3 xs:gap-4">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm xs:text-base"
                            >
                                <ArrowRight size={16} className="xs:w-[18px] xs:h-[18px]" />
                                <span className="font-medium">بازگشت به صفحه قبل</span>
                            </button>

                            <span className="hidden xs:block text-gray-300">|</span>

                            <button
                                onClick={() => setErrorDetails(!errorDetails)}
                                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm xs:text-base"
                            >
                                <AlertTriangle size={16} className="xs:w-[18px] xs:h-[18px]" />
                                <span className="font-medium">
                                    {errorDetails ? 'پنهان کردن جزئیات' : 'مشاهده جزئیات خطا'}
                                </span>
                            </button>
                        </div>

                        {/* Error Details */}
                        {errorDetails && error && (
                            <div className="mt-4 xs:mt-6 p-3 xs:p-4 bg-gray-50 rounded-xl border border-gray-200 max-h-48 xs:max-h-60 overflow-auto">
                                <pre className="text-[10px] xs:text-xs text-gray-600 text-right whitespace-pre-wrap break-words">
                                    {error.stack || error.toString()}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Help Section */}
                    {/* <div className="mt-6 xs:mt-8 p-4 xs:p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl xs:rounded-2xl border border-orange-200/50">
                        <div className="flex flex-col xs:flex-row items-start gap-3">
                            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Mail className="text-white xs:w-5 xs:h-5" size={18}  />
                            </div>
                            <div className="flex-1 w-full">
                                <h3 className="text-base xs:text-lg font-semibold text-gray-800 mb-2">
                                    نیاز به کمک دارید؟
                                </h3>
                                <p className="text-xs xs:text-sm text-gray-600 leading-relaxed mb-3">
                                    در صورت تکرار این خطا، لطفاً با تیم پشتیبانی تماس بگیرید.
                                </p>
                                <div className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-3">
                                    <a
                                        href="/support"
                                        className="inline-flex items-center justify-center gap-2 px-3 xs:px-4 py-2 bg-white hover:bg-orange-50 border border-orange-200 rounded-lg text-xs xs:text-sm font-medium text-gray-700 transition-colors"
                                    >
                                        ارتباط با پشتیبانی
                                    </a>
                                    <a
                                        href="/questions"
                                        className="inline-flex items-center justify-center gap-2 px-3 xs:px-4 py-2 bg-white hover:bg-orange-50 border border-orange-200 rounded-lg text-xs xs:text-sm font-medium text-gray-700 transition-colors"
                                    >
                                        سوالات متداول
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Footer Text */}
                <div className="text-center mt-6 xs:mt-8 px-2">
                    <p className="text-xs xs:text-sm text-gray-500">
                        کد خطا:{" "}
                        <span className="font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded text-[10px] xs:text-xs">
                            ERR_{Date.now().toString().slice(-8)}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}