"use client"

import { Suspense, useState, useMemo } from "react";
import { Calendar, Clock, User, Trash2, AlertCircle, CheckCircle2, Sparkles, XCircle } from "lucide-react";
import DeleteReserveModal from "../module/DeleteReserveModal";

const ReservedListPage = ({ data }) => {
    const [modal, setOpenModal] = useState(false);
    const [selectedTimeId, setSelectedTimeId] = useState(null);

    const openModal = (reservation) => {
        setSelectedTimeId(reservation);
        setOpenModal(true);
    };

    const reserves = data?.reserves || [];

    const sortedReserves = useMemo(() => {
        return [...reserves].sort((a, b) => {
            const statusOrder = { "1": 0, "3": 1, "4": 2 };
            return (statusOrder[a.status] ?? 999) - (statusOrder[b.status] ?? 999);
        });
    }, [reserves]);

    const hasReserves = sortedReserves.length > 0;

    // آمار رزروها
    const stats = useMemo(() => ({
        active: reserves.filter(r => r.status === "1").length,
        cancelled: reserves.filter(r => r.status === "3" || r.status === "4").length
    }), [reserves]);

    return (
        <div dir="rtl" className="min-h-[95svh] bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-[#ffd39a] via-[#ffcd7a] to-[#ffc062] rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 md:p-8">
                    <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white/10 rounded-full blur-2xl sm:blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-white/10 rounded-full blur-xl sm:blur-2xl" />

                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <Calendar className="text-[#ffa726]" size={24} />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg truncate">
                                    نوبت‌های رزرو شده
                                </h1>
                                <p className="text-white/90 drop-shadow-lg text-xs sm:text-sm mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
                                    <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                                    <span className="truncate">مدیریت هوشمند رزروهای شما</span>
                                </p>
                            </div>
                        </div>

                        {hasReserves && (
                            <div className="flex gap-2 sm:gap-3 self-end sm:self-auto">
                                <div className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-white/30">
                                    <p className="text-white/80 text-[10px] sm:text-xs drop-shadow-lg">فعال</p>
                                    <p className="text-white text-base sm:text-lg font-bold drop-shadow-lg">{stats.active}</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-white/30">
                                    <p className="text-white/80 text-[10px] sm:text-xs drop-shadow-lg">لغو شده</p>
                                    <p className="text-white text-base sm:text-lg font-bold drop-shadow-lg">{stats.cancelled}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                {hasReserves ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                        {sortedReserves.map((reservation, index) => (
                            <ReservationCard
                                key={`${reservation.id || index}-${reservation.status}`}
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
                <Suspense fallback={<LoadingModal />}>
                    <DeleteReserveModal
                        selectedTimeId={selectedTimeId}
                        setOpenModal={setOpenModal}
                    />
                </Suspense>
            )}
        </div>
    );
};

// Reservation Card Component
const ReservationCard = ({ reservation, onDelete }) => {
    const { status } = reservation;
    const isActive = status === "1";
    const isCancelledByUser = status === "3";
    const isCancelledByAdmin = status === "4";
    const isCancelled = isCancelledByUser || isCancelledByAdmin;

    const getStatusInfo = () => {
        if (isActive) {
            return {
                badge: { text: "فعال", color: "bg-green-500", icon: CheckCircle2 },
                headerGradient: "from-[#ffd39a] to-[#ffcd7a]",
                opacity: ""
            };
        }
        if (isCancelledByUser) {
            return {
                badge: { text: "لغو شده توسط شما", color: "bg-red-500", icon: XCircle },
                headerGradient: "from-gray-400 to-gray-500",
                opacity: "opacity-70"
            };
        }
        return {
            badge: { text: "لغو شده توسط ادمین", color: "bg-orange-500", icon: AlertCircle },
            headerGradient: "from-gray-400 to-gray-500",
            opacity: "opacity-70"
        };
    };

    const statusInfo = getStatusInfo();
    const StatusIcon = statusInfo.badge.icon;

    return (
        <div className={`group relative bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${statusInfo.opacity}`}>
            {/* Header */}
            <div className={`relative h-20 sm:h-24 bg-gradient-to-r ${statusInfo.headerGradient} p-3 sm:p-4 flex items-center justify-between gap-2`}>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Calendar className="text-[#ffa726]" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-white font-bold drop-shadow-lg text-sm sm:text-base md:text-lg line-clamp-2 sm:line-clamp-1">
                            {reservation.services}
                        </h3>
                    </div>
                </div>

                {/* Status Badge */}
                <div className={`${statusInfo.badge.color} text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1 shadow-lg flex-shrink-0`}>
                    <StatusIcon size={12} className="sm:w-3.5 sm:h-3.5" />
                    <span className="hidden xs:inline">{statusInfo.badge.text}</span>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                {/* زمان و تاریخ */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <DetailBox icon={Calendar} color="blue" label="تاریخ مراجعه" value={reservation.day} isCancelled={isCancelled} />
                    <DetailBox icon={Clock} color="green" label="ساعت مراجعه" value={reservation.time} isCancelled={isCancelled} />
                </div>

                {/* خدمات‌دهنده */}
                <DetailBox icon={User} color="amber" label="خدمات‌دهنده" value={reservation.provider} fullWidth isCancelled={isCancelled} />

                {/* توضیحات */}
                {reservation.description && (
                    <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border-r-4 ${isCancelled ? 'bg-gray-100 border-gray-400' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-[#ffd39a]'}`}>
                        <p className={`text-xs leading-relaxed ${isCancelled ? 'text-gray-500' : 'text-gray-700'}`}>
                            <span className="font-semibold">{isCancelledByAdmin ? "دلیل لغو: " : ""}</span>
                            {reservation.description}
                        </p>
                    </div>
                )}

                {/* دکمه حذف */}
                <button
                    type="button"
                    disabled={isCancelled}
                    onClick={() => onDelete(reservation)}
                    className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${isCancelled
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 hover:-translate-y-1 active:translate-y-0'
                        }`}
                >
                    <Trash2 size={16} className={`sm:w-5 sm:h-5 ${!isCancelled ? 'group-hover:rotate-12 transition-transform' : ''}`} />
                    <span>{isCancelled ? 'نوبت لغو شده' : 'لغو و حذف نوبت'}</span>
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
        <div className={`bg-gradient-to-r ${colorClasses[color]} rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md ${fullWidth ? 'col-span-2' : ''}`}>
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs text-white/80 mb-0.5 sm:mb-1">{label}</p>
                    <p className="font-bold text-xs sm:text-sm text-white truncate">{value}</p>
                </div>
            </div>
        </div>
    );
};

// Loading Modal Component
const LoadingModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#ffd39a] border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">در حال بارگذاری...</p>
        </div>
    </div>
);

// Empty State
const EmptyState = () => (
    <div className="col-span-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 md:p-16 text-center">
            <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ffd39a] to-[#ffcd7a] rounded-full opacity-20 blur-xl sm:blur-2xl" />
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <Calendar className="text-gray-400" size={48} />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">هیچ نوبتی وجود ندارد</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4">
                        شما هنوز هیچ رزروی ثبت نکرده‌اید.<br className="hidden sm:block" />
                        <span className="block sm:inline"> برای شروع، یک نوبت جدید رزرو کنید!</span>
                    </p>
                </div>

                <button
                    onClick={() => window.location.href = '/reservation'}
                    className="group inline-flex items-center gap-1.5 sm:gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#ffd39a] to-[#ffcd7a] text-gray-800 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#ffd39a]/30 hover:shadow-xl hover:shadow-[#ffd39a]/50 transition-all duration-300 hover:-translate-y-1"
                >
                    <Calendar size={16} className="sm:w-5 sm:h-5" />
                    <span>رزرو نوبت جدید</span>
                    <Sparkles size={14} className="sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform" />
                </button>
            </div>
        </div>
    </div>
);

export default ReservedListPage;
