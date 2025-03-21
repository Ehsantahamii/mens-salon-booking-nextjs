"use client"
const ReservedListPage = (userReservedData) => {
    console.log(userReservedData)
    const [data, setData] = useState(userReservedData);
    useEffect(() => {
        setData(userReservedData)
    }, [userReservedData])
    return (
        <div>
            {
                userReservedData.times.map((item, index) => {
                    return <div key={index}>{item.services}</div>
                })

            }
        </div >
    );
};

export default ReservedListPage;