import ReservedListPage from '@/components/template/ReservedListPage';
import { getFetch } from '@/utils/requests';
import { cookies } from 'next/headers';

export default async function page() {
    const accessToken = cookies().get("access_token");
    const userReservedData = await getFetch('/api/v1/user/reserves', { Authorization: `Bearer ${accessToken.value}` });
    console.log(userReservedData)
    return (
        <div>
            <ReservedListPage userReservedData={userReservedData} />
        </div>
    );
};

