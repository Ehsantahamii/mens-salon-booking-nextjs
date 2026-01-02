"use client"

import { Suspense, useState, useMemo } from "react";
import { Calendar, Clock, User, Trash2, AlertCircle, CheckCircle2, Package, Sparkles } from "lucide-react";
import DeleteReserveModal from "../module/DeleteReserveModal";

const ReservedListPage = ({ data }) => {
    const [modal, setOpenModal] = useState(false);
    const [selectedTimeId, setSelectedTimeId] = useState(null);

    const openModal = (reservation) => {
        setSelectedTimeId(reservation);
        setOpenModal(true);
    };

    const reserves = data?.reserves || [];

    // مرتب‌سازی: نوبت‌های فعال اول، سپس لغو شده
    const sortedReserves = useMemo(() => {
        return [...reserves].sort((a, b) => {
            // cancel === 0 یعنی لغو شده
            const aIsCancelled = a.cancel === 0;
            const bIsCancelled = b.cancel === 0;

            // نوبت‌های فعال (cancel !== 0) در بالا
            if (aIsCancelled && !bIsCancelled) return 1;
            if (!aIsCancelled && bIsCancelled) return -1;
            return 0;
        });
    }, [reserves]);

    const hasReserves = sortedReserves.length > 0;

    return (
        <div dir="rtl" className="min-h-[95svh] bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-[#ffd39a] via-[#ffcd7a] to-[#ffc062] rounded-2xl shadow p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                                <Calendar className="text-[#ffa726]" size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white drop-shadow-lg">نوبت‌های رزرو شده</h1>
                                <p className="text-white/90 drop-shadow-lg text-sm mt-1 flex items-center gap-2">
                                    <Sparkles size={14} />
                                    مدیریت هوشمند رزروهای شما
                                </p>
                            </div>
                        </div>

                        {hasReserves && (
                            <div className="hidden md:block bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/30">
                                <p className="text-black/80 text-xs drop-shadow-lg">تعداد رزرو</p>
                                <p className="text-black text-2xl font-bold drop-shadow-lg">{sortedReserves.length}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                {hasReserves ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {sortedReserves.map((reservation, index) => (
                            <ReservationCard
                                key={index}
                                reservation={reservation}
                                onDelete={openModal}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* Modal */}
            {modal && (
                <Suspense fallback={
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="animate-spin w-8 h-8 border-4 border-liteGold border-t-transparent rounded-full mx-auto"></div>
                            <p className="text-gray-600 text-sm mt-4">در حال بارگذاری...</p>
                        </div>
                    </div>
                }>
                    <DeleteReserveModal
                        selectedTimeId={selectedTimeId}
                        setOpenModal={setOpenModal}
                    />
                </Suspense>
            )}
        </div>
    );
};

// Reservation Card Component با چیدمان جدید
const ReservationCard = ({ reservation, onDelete }) => {
    const isCancelled = reservation.cancel === 0;
    const isActive = reservation.status === "1";

    return (
        <div className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isCancelled ? 'opacity-70' : ''}`}>
            {/* Header با گرادیانت */}
            <div className={`relative h-24 ${isCancelled ? 'bg-gradient-to-r from-gray-400 to-gray-500' : 'bg-gradient-to-r from-[#ffd39a] to-[#ffcd7a]'} p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                        <Calendar className="text-[#ffa726]" size={32} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold drop-shadow-lg text-lg line-clamp-1">{reservation.services}</h3>
                    </div>
                </div>

                {/* Status Badge */}
                {!isCancelled && isActive && (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                        <CheckCircle2 size={14} />
                        <span>فعال</span>
                    </div>
                )}

                {isCancelled && (
                    <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                        <AlertCircle size={14} />
                        <span>لغو شده</span>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
                {/* زمان و تاریخ در یک ردیف */}
                <div className="grid grid-cols-2 gap-3">
                    <DetailBox icon={Calendar} color="blue" label="تاریخ" value={reservation.day} isCancelled={isCancelled} />
                    <DetailBox icon={Clock} color="green" label="ساعت" value={reservation.time} isCancelled={isCancelled} />
                </div>

                {/* خدمات‌دهنده */}
                <DetailBox icon={User} color="amber" label="خدمات‌دهنده" value={reservation.provider} fullWidth isCancelled={isCancelled} />

                {/* توضیحات */}
                {reservation.description && (
                    <div className={`rounded-xl p-4 border-r-4 ${isCancelled ? 'bg-gray-100 border-gray-400' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-[#ffd39a]'}`}>
                        <p className={`text-sm leading-relaxed ${isCancelled ? 'text-gray-500' : 'text-gray-700'}`}>{reservation.description}</p>
                    </div>
                )}

                {/* دکمه حذف */}
                <button
                    type="button"
                    disabled={isCancelled}
                    onClick={() => onDelete(reservation)}
                    className={`w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${isCancelled
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 hover:-translate-y-1 active:translate-y-0'
                        }`}
                >
                    <Trash2 size={20} className={!isCancelled ? 'group-hover:rotate-12 transition-transform' : ''} />
                    <span>{isCancelled ? 'نوبت لغو شده است' : 'لغو و حذف نوبت'}</span>
                </button>
            </div>
        </div>
    );
};

// Detail Box Component
const DetailBox = ({ icon: Icon, color, label, value, fullWidth = false, isCancelled = false }) => {
    const colorClasses = {
        blue: isCancelled ? 'from-gray-300 to-gray-400' : 'from-blue-400 to-blue-600',
        green: isCancelled ? 'from-gray-300 to-gray-400' : 'from-green-400 to-green-600',
        amber: isCancelled ? 'from-gray-300 to-gray-400' : 'from-amber-400 to-amber-600'
    };

    return (
        <div className={`bg-gradient-to-r ${colorClasses[color]} rounded-xl p-4 shadow-md ${fullWidth ? 'col-span-2' : ''}`}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-xs text-white/80 mb-1">{label}</p>
                    <p className="font-bold text-sm text-white line-clamp-1">{value}</p>
                </div>
            </div>
        </div>
    );
};

// Empty State با طراحی جدید
const EmptyState = () => (
    <div className="col-span-full">
        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <div className="max-w-md mx-auto space-y-6">
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ffd39a] to-[#ffcd7a] rounded-full opacity-20 blur-2xl" />
                    <div className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <Calendar className="text-gray-400" size={64} />
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">هیچ نوبتی وجود ندارد</h3>
                    <p className="text-gray-600 leading-relaxed">
                        شما هنوز هیچ رزروی ثبت نکرده‌اید.<br />
                        برای شروع، یک نوبت جدید رزرو کنید!
                    </p>
                </div>

                <button
                    onClick={() => window.location.href = '/reservation'}
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ffd39a] to-[#ffcd7a] text-gray-800 font-bold rounded-xl shadow-lg shadow-[#ffd39a]/30 hover:shadow-xl hover:shadow-[#ffd39a]/50 transition-all duration-300 hover:-translate-y-1"
                >
                    <Calendar size={20} />
                    <span>رزرو نوبت جدید</span>
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                </button>
            </div>
        </div>
    </div>
);

export default ReservedListPage;