'use client';

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {Button} from "@/components/ui/button";

export const Socials = () => {
    return (
        <div className='flex items-center w-full gap-x-2'>
            <Button
                variant='outline'
                size='lg'
                className='w-full'
                onClick={() => {}}
            >
                <FcGoogle className='h-5 w-5' />
            </Button>
            <Button
                variant='outline'
                size='lg'
                className='w-full'
                onClick={() => {}}
            >
                <FaGithub className='h-5 w-5' />
            </Button>
        </div>
    );
}