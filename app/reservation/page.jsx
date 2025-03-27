import ReservationPage from '@/components/template/ReservationPage';
import { getFetch } from '@/utils/requests';
import { cookies } from 'next/headers';

export default async function page() {
    const accessToken = (await cookies()).get("access_token");

    const data = await getFetch('/api/v1/reservation/services');
    // const userReservedData = await getFetch('/api/v1/user/reserves', { Authorization: `Bearer ${accessToken.value}` });

    return (
        <>
            <ReservationPage salonData={data}  />
        </>
    );
};

