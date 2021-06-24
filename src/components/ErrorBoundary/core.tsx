import React, {Component} from 'react'
import './index.less'

interface ErrorBoundaryProps {
  /** 监听错误的回调函数 */
  onError?: (error: Error, errorInfo: any) => void

  /** 降级备用渲染 React Element */
  fallback?: React.ReactElement

  /** 降级备用渲染 React 组件 */
  FallbackComponent?: any

  fallbackRender: (args: any) => any

  /** 重置错误组件的状态函数 */
  onReset?: () => void
}

interface ErrorBoundaryState {
  /** 是否有错误 */
  error: boolean
}

const initialState = {error: false}

/** 错误边界组件 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = initialState

  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  // 执行自定义重置逻辑，并重置组件状态
  resetErrorBoundary = () => {
    if (this.props.onReset) this.props.onReset()
    this.setState(initialState)
  }

  render() {
    const {fallback, FallbackComponent, fallbackRender} = this.props
    const {error} = this.state

    if (error) {
      const fallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      }

      if (React.isValidElement(fallback)) return fallback

      if (typeof fallbackRender === 'function')
        return fallbackRender(fallbackProps)

      if (FallbackComponent) return <FallbackComponent {...fallbackProps} />

      throw new Error('ErrorBoundary 组件需要传入 fallback')
    }

    return this.props.children
  }
}
