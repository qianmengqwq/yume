import { RootPortal } from '../portal'
import { DialogClose } from './close'
import { DialogContent } from './content'
import { DialogDescription } from './description'
import { DialogRoot } from './root'
import { DialogTitle } from './title'
import { DialogTrigger } from './trigger'

export const Dialog = { Root: DialogRoot, Content: DialogContent, Trigger: DialogTrigger, Title: DialogTitle, Description: DialogDescription, Close: DialogClose, Portal: RootPortal }
