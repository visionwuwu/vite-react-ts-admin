import React, {useEffect} from 'react'
import Router from '@/router/index'
import IntlPro from '@/locales'
import useShallowEqualSelector from 'hooks/useShallowEqualSelector'
// import Initializer from '@/core/bootstrap'

interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  const lang = useShallowEqualSelector(state => state.app.lang)
  const {weekMode, grayMode} = useShallowEqualSelector(state => state.settings)

  const setWeekMode = () => {
    if (weekMode) {
      document.documentElement.classList.add('week-mode')
    } else {
      document.documentElement.classList.remove('week-mode')
    }
  }

  const setGrayMode = () => {
    if (grayMode) {
      document.documentElement.classList.add('gray-mode')
    } else {
      document.documentElement.classList.remove('gray-mode')
    }
  }

  useEffect(() => {
    setWeekMode()
  }, [weekMode])

  useEffect(() => {
    setGrayMode()
  }, [grayMode])
  return (
    <IntlPro locale={lang}>
      <Router />
    </IntlPro>
  )
}

export default React.memo(App)
