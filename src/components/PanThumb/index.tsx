import React from 'react'
import './index.less'

interface IPanThumbProps {
  image: string
  zIndex?: number
  width?: string
  height?: string
  className?: string
}

const PanThumb: React.FC<IPanThumbProps> = props => {
  const {image, zIndex, width, height, className} = props
  return (
    <div
      className={`pan-item ${className}`}
      style={{
        zIndex,
        height,
        width,
      }}
    >
      <div className="pan-info">
        <div className="pan-info-roles-container">{props.children}</div>
      </div>
      <img src={image} className="pan-thumb" alt="" />
    </div>
  )
}

PanThumb.defaultProps = {
  width: '150px',
  height: '150px',
  zIndex: 1,
  className: '',
}

export default PanThumb
