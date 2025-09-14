import {
  PropsWithChildren,
  useEffect,
  useState,
  useRef,
  useCallback,
  MouseEventHandler,
} from 'react'
import { createContainer } from './Portal/createContainer'
import Portal from './Portal/index'
import CloseIcon from 'assets/cross.svg?react'

interface IModalProps {
  id: string
  onClose: (e: React.MouseEvent) => void
  title: string
}

const Modal = ({ id, onClose, children, title }: PropsWithChildren<IModalProps>) => {
  const [isMounted, setMounted] = useState(false)

  const handleClose: MouseEventHandler<SVGSVGElement> = useCallback(
    (e) => {
      onClose(e)
    },
    [onClose],
  )

  const modalWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    createContainer({ id: id })
    setMounted(true)
  }, [id])

  return isMounted ? (
    <Portal id={id}>
      <div
        className="fixed inset-0 bg-transparent flex items-center justify-center z-50"
        ref={modalWrapperRef}
      >
        <div className="bg-white opacity-50 p-5 rounded-lg w-[890px] max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b border-black pb-4 px-8 pt-7">
            <h1 className="text-black text-3xl font-normal m-0">{title}</h1>
            <CloseIcon
              type="button"
              onClick={handleClose}
              className="w-9 h-9 cursor-pointer"
            />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  ) : null
}

export default Modal