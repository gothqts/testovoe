import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import useClickOutside from './useClickOutside'

// hook for handling clicks ouside and presses of the escape key
const usePopup = (ref: React.RefObject<HTMLElement>, onClose: Dispatch<SetStateAction<boolean>>) => {
  useClickOutside(ref, onClose)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isEscape = e.key === 'Escape'

      if (isEscape) {
        e.preventDefault()
        onClose(false)
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (ref.current) {
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [handleKeyDown])
}

export default usePopup
