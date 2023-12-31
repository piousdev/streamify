'use client';

import {Noticia_Text, Nunito_Sans} from "next/font/google";
import {cn} from "@/lib/utils";


const noticiaText = Noticia_Text({ subsets: ['latin'], weight: ['400', '700'] });
const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] });

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
            <h1 className={cn('text-3xl', noticiaText.className)}>
                Streamify
            </h1>
            <p className={cn('text-lg text-muted-foreground', nunitoSans.className)}>
                {label}
            </p>
        </div>
    );
}