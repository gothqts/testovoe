import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react'

export type IButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({ children, className = '', type, ...props }: PropsWithChildren<IButtonProps>) => {
  return (
    <button
      {...props}
      type={type || 'button'}
      className={`
        py-3 px-4 
        text-center 
        font-medium 
        text-sm 
        leading-6 
        rounded-xl 
        outline-none 
        border-none 
        cursor-pointer 
        relative 
        flex 
        justify-center 
        items-center 
        gap-2.5 
        transition-all 
        duration-300 
        ${className}
      `}
    >
      <div>{children}</div>
    </button>
  )
}

export default Button