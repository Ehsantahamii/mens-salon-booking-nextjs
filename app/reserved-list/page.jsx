import ReservedListPage from '@/components/template/ReservedListPage';
import { getFetch } from '@/utils/requests';
import { cookies } from 'next/headers';

export const metadata = {
    title: 'نوبت‌های رزرو شده',
    description: 'لیست نوبت‌های رزرو شده',
}

export default async function page() {
    const accessToken = (await cookies()).get("access_token");
    const userReservedData = await getFetch('/user/reserves', {
        Authorization: `Bearer ${accessToken.value}`
    });

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='max-w-5xl mx-auto px-4 py-8'>
                <ReservedListPage data={userReservedData} />
            </div>
        </div>
    );
}
