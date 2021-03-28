import {useEffect, useState} from 'react'
import {SizeType} from 'antd/lib/config-provider/SizeContext'
import {debounce} from 'utils/index'

export default function useTableScrollY(othersHeight = 0, size: SizeType) {
  const initScrollY = document.documentElement.clientHeight - othersHeight || 0

  const [scrollY, setScrollY] = useState(initScrollY)

  function getPosition() {
    setScrollY(document.documentElement.clientHeight - othersHeight)
  }
  const res = debounce(50, getPosition)

  useEffect(() => {
    res()
  }, [size, othersHeight])

  useEffect(() => {
    const listener = () => {
      res()
    }
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('reset', listener)
    }
  })

  return scrollY
}
