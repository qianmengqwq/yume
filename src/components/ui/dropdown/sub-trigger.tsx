import type { DropdownTriggerProps } from './trigger'
import { DropdownItem } from './item'
import { DropdownTrigger } from './trigger'

interface DropdownSubTriggerProps extends DropdownTriggerProps {
}

export function DropdownSubTrigger({ children, className, ...rest }: DropdownSubTriggerProps) {
  return (
    <DropdownTrigger asChild {...rest}>
      <DropdownItem>{children}</DropdownItem>
    </DropdownTrigger>
  )
}
