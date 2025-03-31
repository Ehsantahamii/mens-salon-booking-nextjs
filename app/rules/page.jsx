import "./Rules.css"
const page = () => {
    return (
        <section className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-4">
            <h1 className="text-4xl">
                قوانین و مقررات استفاده از سایت
            </h1>
            <ul className="w-full rule-1">
                <h2 className="text-2xl font-bold mt-2 mb-2">
                    ثبت‌ نام و ایجاد حساب کاربری
                </h2>
                <li>
                    ثبت ‌نام در سایت مشروط به ارائه اطلاعات صحیح(از جمله شماره تماس)، به ‌روز و کامل است.
                </li>

                <li>
                    کاربر متعهد می‌شود که مسئولیت حفظ امنیت اطلاعات حساب کاربری را برعهده گیرد.
                </li>
                <li>
                    ایجاد حساب کاربری به منزله پذیرش کامل قوانین و مقررات سایت می‌باشد.
                </li>
            </ul>
            <ul className="w-full rule-2">
                <h2 className="text-2xl font-bold mt-2 mb-2">
                    رزرو، لغو و تغییر نوبت
                </h2>
                <li>
                    رزرو نوبت از طریق پنل اختصاصی سایت و با انتخاب تاریخ، زمان و خدمات و خدمات دهنده مورد نظر انجام می‌شود.
                </li>
                <li>
                    کاربر قبل از نهایی کردن رزرو موظف است صحت اطلاعات وارد شده را بررسی نماید بدیهی است که سایت هیچگونه مسئولیتی در قبال اشتباهات فردی ندارد.
                </li>
                <li>
                    در صورت نیاز به لغو یا تغییر نوبت، کاربر باید طبق رویه اعلام‌ شده در سایت و حداقل تا ۱ ساعت و نیم  قبل از فرا رسیدن زمان انتخابی اقدام به لغو نوبت، نماید.
                </li>
            </ul>
            <ul className="w-full rule-3">
                <h2 className="text-2xl font-bold mt-2 mb-2">
                    حفظ حریم خصوصی و امنیت اطلاعات
                </h2>
                <li>
                    اطلاعات شخصی کاربران مطابق با سیاست حفظ حریم خصوصی سایت جمع‌آوری و مورد استفاده قرار می‌گیرد.
                </li>
                <li>
                    سایت متعهد به اتخاذ استانداردهای لازم جهت حفظ امنیت اطلاعات (از جمله استفاده از پروتکل‌های رمزنگاری) است.
                </li>
                <li>
                    اطلاعات کاربران بدون کسب رضایت قبلی، به اشخاص ثالث ارائه نخواهد شد مگر به موجب قانون.
                </li>
            </ul>
            <ul className="w-full rule-4">
                <h2 className="text-2xl font-bold mt-2 mb-2">
                    تخلفات و تعلیق حساب کاربری
                </h2>
                <li>
                    هرگونه تخلف از قوانین منجر به محدودیت دسترسی، تعلیق یا بسته شدن حساب کاربری خواهد شد.
                </li>
                <li>
                    سایت حق دارد در موارد تخلف جدی، نسبت به ارجاع موضوع به مراجع قضایی نیز اقدام نماید.
                </li>
            </ul>
            <ul className="w-full rule-5">
                <h2 className="text-2xl font-bold mt-2 mb-2">
                    حل اختلافات و دعاوی حقوقی
                </h2>
                <li>
                    در صورت بروز اختلاف میان طرفین، ابتدا از طریق مذاکره و میانجیگری تلاش برای حل و فصل صورت می‌گیرد.
                </li>
                <li>
                    در صورت عدم توافق، اختلاف به مراجع قضایی صالح ارجاع خواهد شد.
                </li>
                <li>
                    قوانین حاکم بر روابط میان کاربران و سایت، قوانین جمهوری اسلامی ایران محسوب می‌شود.
                </li>
            </ul>
            <ul className="w-full rule-6">
                <h2 className="text-2xl font-bold mt-2 mb-2">
                    تغییرات و اصلاح مقررات
                </h2>
                <li>
                    سایت حق تغییر، اصلاح یا تکمیل هر یک از مفاد قوانین را بدون اطلاع قبلی محفوظ می‌دارد.
                </li>
                <li>
                    استفاده مستمر از خدمات سایت به منزله پذیرش تغییرات اعمال‌شده خواهد بود.
                </li>
                <li>
                    کاربران موظف به مطالعه دوره‌ای قوانین و مقررات می‌باشند.
                </li>
            </ul>
        </section>
    );
};

export default page;