import ArrowIcon from 'assets/arrow.svg?react'

interface IProps {
  isOpen: boolean
  className?: string
}

const FlippingArrow = ({ isOpen, className = '' }: IProps) => {
  return (
    <ArrowIcon
      className={`${isOpen ? 'rotate-270' : ''} ${className}`}
    />
  )
}

export default FlippingArrow
