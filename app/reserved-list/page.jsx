import ReservedListPage from '@/components/template/ReservedListPage';
import { getFetch } from '@/utils/requests';
import { cookies } from 'next/headers';
export const metadata = {
    title: ' نوبت های رزرو شده',
    description: ' لیست نوبت های رزرو شده',
}

export default async function page() {
    const accessToken = (await cookies()).get("access_token");
    const userReservedData = await getFetch('/api/v1/user/reserves', { Authorization: `Bearer ${accessToken.value}` });

    return (
        <div className='md:w-1/2 max-w-[720px] py-[5%] mx-auto '>
            <h1 className=' text-right my-4'>
                لیست نوبت های رزرو شده
            </h1>
            <ReservedListPage data={userReservedData} />
        </div>
    );
};

