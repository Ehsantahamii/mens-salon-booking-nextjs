import Link from 'next/link';
import React from 'react';

const Developmart = () => {
    return (
        <div className='lg:flex gap-1 hidden fixed bottom-4 right-4 text-[0.8em] '>
            طراحی شده توسط تیم طراحی سایت
            <Link href="https://developmart.ir/" className='text-[#B04EF8]' >
                Developmart
            </Link>
        </div>
    );
};

export default Developmart;