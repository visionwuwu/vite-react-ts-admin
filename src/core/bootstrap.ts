import {useEffect} from 'react'
export default function Initializer() {
  useEffect(() => {
    console.log('Initializer')
  }, [])
}
