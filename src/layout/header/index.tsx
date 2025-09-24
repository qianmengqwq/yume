import { Back } from '@/components/common/operations/back'
import { Logo } from './logo'
import { Navs } from './navs'
import { Operations } from './operations'

export function Header() {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Navs />
          <Operations />
        </div>
      </header>
      <Back />
    </div>
  )
}
