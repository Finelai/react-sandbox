import { Component, type ErrorInfo, type ReactNode } from 'react'

interface IErrorState {
  isError: boolean
}

interface IProps {
  children: ReactNode
}

class ErrorBoundary extends Component<IProps> {
  state: IErrorState = {
    isError: false,
  }

  static getDerivedStateFromError(): IErrorState {
    return { isError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(
      'Pay attention to the error:',
      error,
      '\nError info:',
      errorInfo,
    )
  }

  render(): ReactNode {
    return this.state.isError ? <div>Oops</div> : this.props.children
  }
}

export { ErrorBoundary }
