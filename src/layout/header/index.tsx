import { Back } from '@/components/common/operations/back'
import { Logo } from './logo'
import { Navs } from './navs'

export function Header() {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex items-center justify-between">
        <Logo />
        <Navs />
      </header>
      <Back />
    </div>
  )
}
