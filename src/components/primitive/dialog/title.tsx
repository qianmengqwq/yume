import type { ElementType, HTMLAttributes } from 'react'
import { useEffect, useId } from 'react'
import { useDialogContext } from './context'

export type TitleProps = HTMLAttributes<HTMLHeadingElement> & { as?: ElementType }

export function DialogTitle({ as, id, ...rest }: TitleProps) {
  const { setLabelId } = useDialogContext()
  const autoId = useId()
  const finalId = id ?? autoId
  useEffect(() => {
    setLabelId(finalId)
    return () => setLabelId(undefined)
  }, [finalId, setLabelId])
  const As = as || 'h2'
  return <As id={finalId} {...rest} />
}
