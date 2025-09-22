import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { SocialMedia } from './social-media'

export function Intro() {
  return (
    <section className="flex justify-center flex-col gap-4 mt-16">
      <Image src={siteConfig.avatar} alt="Avatar" width={100} height={100} className="rounded-full" />
      <span className="flex flex-col gap-4 break-words">
        <p className="text-2xl">
          hello, I'm
          {' '}
          <span className="text-primary font-bold">{siteConfig.author}</span>
        </p>
        <p className="text-xl font-mono">
          A Nodejs
          {' '}
          {'<Developer />'}
        </p>
        <SocialMedia />
      </span>
    </section>
  )
}
