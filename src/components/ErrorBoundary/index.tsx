import React from 'react'
import DefaultErrorBoundary from './core'
const catchreacterror = (Boundary: any = DefaultErrorBoundary) => (
  InnerComponent: any,
  // eslint-disable-next-line
) => (props: any) => {
  return (
    <Boundary {...props}>
      <InnerComponent {...props} />
    </Boundary>
  )
}

export default catchreacterror
