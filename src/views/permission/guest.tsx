import * as React from 'react'
import TypingCard from 'comps/TypingCard'

interface IGuestProps {}

const Guest: React.FC<IGuestProps> = () => {
  return (
    <div className="app-container">
      <TypingCard
        title="guest页面"
        source="这个页面只有admin和guest角色才可以访问，editor角色看不到"
      />
    </div>
  )
}

export default Guest
