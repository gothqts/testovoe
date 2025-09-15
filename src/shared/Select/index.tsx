import { CSSProperties, useMemo, useRef, useState } from 'react'
import { IOption } from 'types/global'
import FlippingArrow from 'shared/FlippingArrow'
import usePopup from 'shared/hooks/usePopup'
import Dropdown from 'shared/Dropdown'
import { v4 as uuidv4 } from 'uuid';

export interface IDropdownProps<T extends string | number> {
  options: IOption<T>[]
  selectedOption?: IOption<T>['value']
  hideOptionId?: IOption<T>['value']
  onSelect: (option: T, name?: string) => void
  name?: string
  label?: string
  title?: string
  disabled?: boolean
  style?: CSSProperties
  inputStyle?: CSSProperties
  className?: string
}

const SelectDropdown = <T extends string | number>(props: IDropdownProps<T>) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  usePopup(ref, setIsOpen)

  const selectedOption = useMemo(() => {
    return props.options.find((o) => o.value === props.selectedOption)
  }, [props.selectedOption, props.options])





  const handleChange = (optionValue: T) => () => {
    props.onSelect(optionValue, props.name)
    setIsOpen(false)
  }

  return (
    <div className={`relative mb-4 ${props.className || ''}`} style={props.style}>
      {props.label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {props.label}
        </label>
      )}

      <div ref={ref} className="relative">
        <div
          className={`
            w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm
            transition-all duration-200 ease-in-out cursor-pointer
            flex items-center justify-between
            hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : ''}
            ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}
          `}
          style={props.inputStyle}
          onClick={!props.disabled ? () => setIsOpen(!isOpen) : undefined}
        >
          {props.selectedOption ? (
            <span className="text-gray-800 truncate">{selectedOption?.title}</span>
          ) : (
            <span className="text-gray-500">{props.title || 'Выберите опцию'}</span>
          )}

          <div className="flex items-center">
            <FlippingArrow isOpen={isOpen} />
          </div>
        </div>

        <Dropdown open={isOpen} className="absolute z-50 w-full mt-2 overflow-auto" maxHeight={150}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-1">
            {props.options
              .filter((option) => option.value !== props.hideOptionId)
              .map((option) => (
                <div
                  key={uuidv4()}
                  className={`
                    px-4 py-2 cursor-pointer transition-colors duration-150 ease-in-out
                    hover:bg-blue-50 hover:text-blue-700
                    ${option.value === props.selectedOption ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-700'}
                  `}
                  onClick={handleChange(option.value)}
                >
                  <span className="block truncate">{option.title}</span>
                </div>
              ))}
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default SelectDropdown