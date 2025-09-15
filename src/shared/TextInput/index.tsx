import {
  ChangeEvent,
  CSSProperties,
  InputHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react'


export type OmittedInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>

export interface ITextInputProps extends OmittedInputProps {
  style?: CSSProperties
  onChange: (value: string, name: string) => void
  label?: string
  size?: number
  autoFocus?: boolean
  name: string
  serverError?: string
  errorText?: string
  error?: boolean
}

const TextInput =  ({
  onChange,
  children,
  style,
  size,
  autoFocus,
  value,
  ...props
}: PropsWithChildren<ITextInputProps>) => {

  const { type = 'text', name } = props
  const inputRef = useRef<HTMLInputElement>(null)


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value, name)
  }

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [autoFocus])


  return (
    <div
      className="w-full flex flex-col"
      style={style}
    >
      {children}
      <input
        ref={inputRef}
        type={type}
        value={value}
        className="p-[13px_16px] rounded outline-none shadow-sm  text-sm leading-5 border "
        onChange={handleChange}
        data-size={size}
        autoComplete="off"
        {...props}
      />
    </div>
  )
}

export default TextInput