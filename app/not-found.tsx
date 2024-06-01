'use client'

import Link from 'next/link'
import dynamic from "next/dynamic";
import notFound from '@/public/animations/NotFoundAnimation.json'


export default function NotFound() {

    const DynamicLottieComponent = dynamic(() => import("lottie-react"), {
        ssr: false,
    });

    return (
        <div className='w-full h-full mt-[-100px]'>
            <DynamicLottieComponent
                animationData={notFound}
                loop={true}
                className="w-full h-[70vh]"
            />
            <div className='flex flex-col items-center justify-center gap-2'>
                <p className='font-[400] text-xl'>Страница не найдена</p>
                <Link
                    href="/"
                    className='mx-auto font-[400] text-lg bg-[#252525] rounded-3xl text-white py-3 px-5'
                >
                    Вернуться на главную страницу
                </Link>
            </div>
        </div>
    )
}