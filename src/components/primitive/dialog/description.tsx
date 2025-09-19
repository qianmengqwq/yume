import type { HTMLAttributes, JSX } from 'react'
import { useEffect, useId } from 'react'
import { useDialogContext } from './context'

export type DescriptionProps = HTMLAttributes<HTMLParagraphElement> & { as?: keyof JSX.IntrinsicElements }

export function DialogDescription({ as = 'p', id, ...rest }: DescriptionProps) {
  const { setDescriptionId } = useDialogContext()
  const autoId = useId()
  const finalId = id ?? autoId
  useEffect(() => {
    setDescriptionId(finalId)
    return () => setDescriptionId(undefined)
  }, [finalId, setDescriptionId])
  const As: any = as
  return <As id={finalId} {...rest} />
}
