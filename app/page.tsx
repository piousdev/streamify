import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {LoginButton} from "@/components/auth/login-button";
import {Noticia_Text, Nunito_Sans} from "next/font/google";



const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const noticiaText = Noticia_Text({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {
  return (
      <main
          className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200 to-orange-800'>
        <div className='space-y-6 text-center'>
          <h1 className={cn('text-6xl font-[700] text-white drop-shadow-md', noticiaText.className)}>
            Streamify
          </h1>
          <p className={cn('text-white text-lg', nunitoSans.className)}>
            The best way to build a community doing what you love.
        </p>
        <div>
          <LoginButton>
            <Button variant='secondary' size='lg'>
              Login to Streamify
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
