import React, {memo} from 'react'
import TypingCard from 'comps/TypingCard'

interface IDocProps {}

const Doc: React.FC<IDocProps> = () => {
  const source = React.useMemo(() => {
    return `开发文档请戳这里 <a target="_blank" href="http://vite2-vue3-docs.visionwu.top/">vite-vue3-docs</a> 开发文档。 目前正在编写完善中...`
  }, [])

  return (
    <div className="app-container">
      <TypingCard title="开发文档" source={source} />
    </div>
  )
}

export default memo(Doc)
