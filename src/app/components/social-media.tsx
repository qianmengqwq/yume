import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function SocialMedia() {
  const iconBaseStyle = 'size-6 text-text-secondary hover:text-accent'
  const medias = [
    {
      link: siteConfig.links.github,
      icon: (
        <span className={`i-mingcute-github-line ${iconBaseStyle}`} />
      ),
    },
    { link: siteConfig.links.email, icon: <span className={`i-mingcute-mail-line ${iconBaseStyle}`} />,
    },
  ] as const

  return (
    <div className="flex gap-4">
      {medias.map(item => (
        <Link
          key={item.link}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  )
}
