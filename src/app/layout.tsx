import { NormalContainer } from '@/layout/container/normal'
import { Footer } from '@/layout/footer'
import { Header } from '@/layout/header'
import { Hydrations } from '@/providers/hydrations'
import { Providers } from '@/providers/providers'
import { Overlay } from './components/overlay'
import '../styles/index.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-contrast="low" data-scroll-behavior="smooth">
      <body className="bg-background-kawaii text-text-kawaii antialiased transition-colors duration-300">
        <Hydrations />
        <Providers>
          <Overlay />
          <NormalContainer>
            <Header />
            {children}
            <Footer />
          </NormalContainer>
        </Providers>
      </body>
    </html>
  )
}
