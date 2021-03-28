import {useEffect, useState} from 'react'

// eslint-disable-next-line
export default function useDocumentSize(callback?: Function) {
  const [documentSize, setDocumentSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const listener = () => {
    const width = document.documentElement.clientWidth || window.innerWidth
    const height = document.documentElement.clientHeight || window.innerHeight
    const size = {width, height}
    callback && callback(size)
    setDocumentSize(size)
  }

  useEffect(() => {
    window.addEventListener('resize', listener, false)
    return () => {
      window.removeEventListener('resize', listener, false)
    }
  }, [])

  return documentSize
}
