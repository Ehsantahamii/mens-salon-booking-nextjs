import ReservedListPage from '@/components/template/ReservedListPage';
import { getFetch } from '@/utils/requests';

export default async function page() {
    const accessToken = cookies().get("access_token");
    // const userReservedData = await getFetch('/api/v1/user/reserves', { Authorization: `Bearer ${accessToken.value}` });

    return (
        <div>
            <ReservedListPage />
        </div>
    );
};

