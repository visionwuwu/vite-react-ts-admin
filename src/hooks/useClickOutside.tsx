import {useEffect, RefObject} from 'react'

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void,
): void {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        !ref.current ||
        ref.current.contains(e.target as HTMLElement) ||
        !handler
      ) {
        return
      }
      handler(e)
    }

    document.addEventListener('click', listener, false)

    return () => {
      document.removeEventListener('click', listener, false)
    }
  }, [ref, handler])
}
