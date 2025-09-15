import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react'

const useClickOutside = (ref: MutableRefObject<HTMLElement | null>, clickOutside: Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        clickOutside(false)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [clickOutside])
}

export default useClickOutside
