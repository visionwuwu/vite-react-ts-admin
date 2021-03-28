import * as React from 'react'
import {Card, Progress} from 'antd'
import PanThumb from 'comps/PanThumb'
import Mallki from 'comps/Mallki'
import avatarImg from 'assets/images/avatar.jpg'
import './index.less'

interface IBoxCardProps {}

const BoxCard: React.FC<IBoxCardProps> = () => {
  return (
    <div className="box-card-component">
      <Card
        cover={
          <img
            alt="example"
            src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
          />
        }
      >
        <div style={{position: 'relative'}}>
          <PanThumb image={avatarImg} className="panThumb" />
          <Mallki className="mallki-text" text="橙晨燕" />

          <div className="progress-item" style={{paddingTop: '35px'}}>
            <span>ReactJs</span>
            <Progress percent={70} />
          </div>

          <div className="progress-item">
            <span>TypeScript</span>
            <Progress percent={85} />
          </div>

          <div className="progress-item">
            <span>Less</span>
            <Progress percent={12} />
          </div>

          <div className="progress-item">
            <span>Vite</span>
            <Progress percent={100} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BoxCard
