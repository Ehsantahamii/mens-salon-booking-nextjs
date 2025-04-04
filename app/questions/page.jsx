import QuestionBox from '@/components/module/QuestionBox';
import React from 'react';
export const metadata = {
    title: 'سوالات متداول',
}

const page = () => {
    return (
        <section className='pt-[6%]'>
            <QuestionBox />
        </section>
    );
};

export default page;