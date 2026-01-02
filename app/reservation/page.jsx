import ReservationPage from '@/components/template/ReservationPage';
import { getFetch } from '@/utils/requests';
import { Suspense } from 'react';

export default async function page() {

    const data = await getFetch('/reservation/services');

    return (
        <>
            <Suspense fallback={
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 shadow-xl">
                        <div className="animate-spin w-8 h-8 border-4 border-liteGold border-t-transparent rounded-full mx-auto"></div>
                        <p className="text-gray-600 text-sm mt-4">در حال بارگذاری...</p>
                    </div>
                </div>
            }>
                <ReservationPage salonData={data || []} />
            </Suspense>

        </>
    );
};

