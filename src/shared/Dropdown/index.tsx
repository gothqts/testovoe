import { CSSProperties, PropsWithChildren } from 'react'

interface IProps {
  open: boolean
  className?: string
  maxHeight?: number
}

const Dropdown = (props: PropsWithChildren<IProps>) => {
  if (!props.open) return null

  const style: CSSProperties = {}
  if (props.maxHeight) {
    style.maxHeight = props.maxHeight
    style.overflow = 'auto'
  }

  return (
    <div className={props.className} style={style}>
      {props.children}
    </div>
  )
}

export default Dropdown