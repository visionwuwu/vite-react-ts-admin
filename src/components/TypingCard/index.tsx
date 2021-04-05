import React, {useRef, useEffect, memo} from 'react'
import {Card} from 'antd'
import Typing from 'utils/typing'

interface ITypingCardProps {
  title: string
  source: string
}

const TypingCard: React.FC<ITypingCardProps> = props => {
  const {title, source} = props

  const sourceEl = useRef<any>(null)
  const outputEl = useRef<any>(null)

  useEffect(() => {
    const typing = new Typing({
      source: sourceEl.current,
      output: outputEl.current,
      delay: 30,
    })
    typing.start()
  }, [])
  return (
    <Card bordered={false} className="card-item" title={title}>
      <div
        style={{display: 'none'}}
        ref={sourceEl}
        dangerouslySetInnerHTML={{__html: source}}
      />
      <div ref={outputEl} />
    </Card>
  )
}

TypingCard.defaultProps = {
  title: '',
  source: '',
}

export default memo(TypingCard)
