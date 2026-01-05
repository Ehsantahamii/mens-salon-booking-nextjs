"use client"

import { Suspense, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import DeleteReserveModal from "../module/DeleteReserveModal";

const ReservedListPage = ({ data }) => {
    const router = useRouter();
    const [modal, setOpenModal] = useState(false);
    const [selectedTimeId, setSelectedTimeId] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);

    const openModal = (reservation) => {
        setSelectedTimeId(reservation);
        setOpenModal(true);
    };

    // بررسی امن داده‌ها
    const reserves = useMemo(() => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (data.reserves && Array.isArray(data.reserves)) return data.reserves;
        if (data.payload && Array.isArray(data.payload)) return data.payload;
        return [];
    }, [data]);

    // مرتب‌سازی: فعال‌ها اول، سپس لغو‌شده‌ها
    const sortedReserves = useMemo(() => {
        if (!reserves.length) return [];

        return [...reserves].sort((a, b) => {
            // اول: فعال‌ها بالای لیست
            if (a.status === "1" && b.status !== "1") return -1;
            if (b.status === "1" && a.status !== "1") return 1;

            // دوم: لغو‌شده‌ها بر اساس description
            if (a.status !== "1" && b.status !== "1") {
                const descA = a.description || '';
                const descB = b.description || '';
                return descB.localeCompare(descA, 'fa');
            }

            return 0;
        });
    }, [reserves]);

    const hasReserves = sortedReserves.length > 0;

    const stats = useMemo(() => ({
        active: reserves.filter(r => r.status === "1").length,
        cancelled: reserves.filter(r => r.status === "3" || r.status === "4").length
    }), [reserves]);

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 py-6 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                                <Calendar className="text-orange-500" size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">نوبت‌های من</h1>
                                <p className="text-sm text-gray-500 mt-0.5">مدیریت رزروهای شما</p>
                            </div>
                        </div>

                        {hasReserves && (
                            <div className="flex gap-3">
                                <div className="bg-green-50 px-4 py-2 rounded-lg">
                                    <div className="text-xs text-green-600 font-medium">فعال</div>
                                    <div className="text-xl font-bold text-green-700 mt-0.5">{stats.active}</div>
                                </div>
                                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                                    <div className="text-xs text-gray-600 font-medium">لغو شده</div>
                                    <div className="text-xl font-bold text-gray-700 mt-0.5">{stats.cancelled}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* محتوای اصلی */}
                {hasReserves ? (
                    <div className="space-y-4">
                        {sortedReserves.map((reservation, index) => {
                            const uniqueId = reservation.time_id ||
                                reservation.id ||
                                `${reservation.time}-${reservation.day}-${index}`;

                            return (
                                <ReservationCard
                                    key={uniqueId}
                                    reservation={reservation}
                                    onDelete={openModal}
                                    isExpanded={expandedCard === uniqueId}
                                    onToggleExpand={() => {
                                        setExpandedCard(expandedCard === uniqueId ? null : uniqueId);
                                    }}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState router={router} />
                )}
            </div>

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

// کامپوننت کارت رزرو
const ReservationCard = ({ reservation, onDelete, isExpanded, onToggleExpand }) => {
    if (!reservation) return null;

    const { status, cancel } = reservation;
    const isActive = status === "1";

    const shouldShowDescription = reservation.description &&
        !reservation.description.startsWith("رزرو شده");

    const statusConfig = {
        "1": {
            text: "فعال",
            bgColor: "bg-green-50",
            textColor: "text-green-700",
            borderColor: "border-green-100"
        },
        "3": {
            text: "لغو توسط خدمات‌دهنده",
            bgColor: "bg-orange-50",
            textColor: "text-orange-700",
            borderColor: "border-orange-100"
        },
        "4": {
            text: "لغو توسط شما",
            bgColor: "bg-red-50",
            textColor: "text-red-700",
            borderColor: "border-red-100"
        }
    };

    const config = statusConfig[status] || statusConfig["1"];

    return (
        <div className={`bg-white rounded-2xl shadow-sm border ${config.borderColor} overflow-hidden transition-all duration-200 hover:shadow-md ${!isActive && 'opacity-75'}`}>
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {reservation.services || 'خدمات'}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                            {config.text}
                        </span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
                {/* اطلاعات اصلی */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <InfoItem
                        icon={Calendar}
                        label="تاریخ مراجعه"
                        value={reservation.day || '-'}
                    />
                    <InfoItem
                        icon={Clock}
                        label="ساعت مراجعه"
                        value={reservation.time || '-'}
                    />
                    <InfoItem
                        icon={User}
                        label="خدمات دهنده"
                        value={reservation.provider || '-'}
                    />
                </div>

                {/* توضیحات */}
                {shouldShowDescription && (
                    <div className="pt-4 border-t border-gray-100">
                        <button
                            onClick={onToggleExpand}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            <span>جزئیات</span>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {isExpanded && (
                            <p className="mt-3 text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-4">
                                {reservation.description}
                            </p>
                        )}
                    </div>
                )}

                {/* دکمه عملیات */}
                <div className="pt-2">
                    {isActive && cancel === 1 ? (
                        <button
                            onClick={() => onDelete(reservation)}
                            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors group"
                        >
                            <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                            <span>لغو نوبت</span>
                        </button>
                    ) : !isActive ? (
                        <div className="text-sm text-gray-500 font-medium">
                            این نوبت لغو شده است
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

// کامپوننت اطلاعات
const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
            <Icon className="text-gray-600" size={18} />
        </div>
        <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 mb-0.5">{label}</div>
            <div className="text-sm font-medium text-gray-900 truncate">{value}</div>
        </div>
    </div>
);

// کامپوننت EmptyState
const EmptyState = ({ router }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="max-w-sm mx-auto space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                <Calendar className="text-gray-400" size={40} />
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    هنوز نوبتی ندارید
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    برای رزرو نوبت جدید و استفاده از خدمات، دکمه زیر را بزنید
                </p>
            </div>

            <button
                onClick={() => router.push("/reservation")}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
            >
                <Calendar size={18} />
                <span>رزرو نوبت جدید</span>
            </button>
        </div>
    </div>
);

// کامپوننت LoadingModal
const LoadingModal = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-orange-500 mx-auto" />
            <p className="text-sm text-gray-600 mt-4">در حال بارگذاری...</p>
        </div>
    </div>
);

export default ReservedListPage;