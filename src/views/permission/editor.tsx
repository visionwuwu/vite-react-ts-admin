import * as React from 'react'
import TypingCard from 'comps/TypingCard'

interface IEditorProps {}

const Editor: React.FC<IEditorProps> = () => {
  return (
    <div className="app-container">
      <TypingCard
        title="editor页面"
        source="这个页面只有admin和editor角色才可以访问，guest角色看不到"
      />
    </div>
  )
}

export default Editor
