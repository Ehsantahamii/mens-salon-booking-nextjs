import ReservedListPage from '@/components/template/ReservedListPage';
import { getFetch } from '@/utils/requests';
import { cookies } from 'next/headers';

export default async function page() {
    const accessToken = cookies().get("access_token");
    const userReservedData = await getFetch('/api/v1/user/reserves', { Authorization: `Bearer ${accessToken.value}` });
    console.log(userReservedData)
    return (
        <div className='w-1/2 max-w-[720px] py-[5%] mx-auto '>
            <h1 className='text-[1.7em] text-right my-4'>
                لیست نوبت های رزرو شده
            </h1>
            <ReservedListPage data={userReservedData} />
        </div>
    );
};

