import * as React from 'react'
import TypingCard from 'comps/TypingCard'

interface IAdminProps {}

const Admin: React.FC<IAdminProps> = () => {
  return (
    <div className="app-container">
      <TypingCard
        title="admin页面"
        source="这个页面只有admin角色才可以访问，guest和editor角色看不到"
      />
    </div>
  )
}

export default Admin
