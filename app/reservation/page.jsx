import ReservationPage from '@/components/template/ReservationPage';
import { getFetch } from '@/utils/requests';

export default async function page() {
    const data = await getFetch('/api/v1/reservation/services');

    return (
        <>
            <ReservationPage salonData={data} />
        </>
    );
};

