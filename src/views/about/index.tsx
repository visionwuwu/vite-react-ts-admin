import React from 'react'
import TypingCard from 'comps/TypingCard'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  return (
    <div className="app-container">
      <TypingCard title="关于作者" source="大家好呀！" />
    </div>
  )
}

export default Home
