import Link from 'next/link'

export function Navs() {
  const navItems = [
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ]

  return (
    <nav className="flex gap-4">
      {navItems.map(item => (
        <Link key={item.href} href={item.href} className=" hover:text-secondary transition-colors duration-300">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
