import React, {memo} from 'react'
import './index.less'

interface IMallkiProps {
  className?: string
  text?: string
}

const Mallki: React.FC<IMallkiProps> = props => {
  const {className, text} = props
  return (
    <a className={`mallki ${className}`} href="#/">
      {text}
      <span data-letters={text} />
      <span data-letters={text} />
    </a>
  )
}
Mallki.defaultProps = {
  className: '',
  text: 'React-Antd-Admin',
}

export default memo(Mallki)
