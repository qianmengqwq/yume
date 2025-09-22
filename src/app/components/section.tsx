import type { ReactNode } from 'react'
import Link from 'next/link'

interface SectionProps {
  children?: ReactNode
  title: string
  href?: string
}

export function Section({ children, title, href }: SectionProps) {
  return (
    <section className="flex flex-col gap-y-6">
      <h2 className="font-aboreto text-3xl font-bold">
        {href
          ? (
              <Link href={href} className="hover:text-link hover:cursor-pointer transition-colors duration-300">
                {title}
              </Link>
            )
          : (
              title
            )}
      </h2>
      {children}
    </section>
  )
}
