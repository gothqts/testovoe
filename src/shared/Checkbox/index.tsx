import { ChangeEvent, JSX } from 'react'

interface ICheckboxProps {
  checked: boolean,
  name: string,
  onChange: (val: boolean, name: string) => void,
  label: JSX.Element | string,
}

const Checkbox = (props: ICheckboxProps) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked, props.name)
  }
  return (
    <div
      className="w-full flex justify-between"

    >
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <input
        id={props.name}
        type="checkbox"
        name={props.name}
        checked={props.checked}
        onChange={handleChange}
      />
    </div>
  )
}

export default Checkbox