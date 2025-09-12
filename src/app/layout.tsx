import { Hydrations } from '@/providers/hydrations'
import { Providers } from '@/providers/providers'
import '../styles/index.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <Hydrations />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
