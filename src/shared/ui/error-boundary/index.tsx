import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorState = { isError: boolean }

interface IProps {
  children: ReactNode
}

class ErrorBoundary extends Component<IProps> {
  state: ErrorState = {
    isError: false,
  };

  static getDerivedStateFromError(): ErrorState {
    return { isError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Pay attention to the error. ${error}: ${errorInfo}`)
  }

  clearState = (): void => {
    this.setState({
      isError: false,
    })
  }

  render(): ReactNode {
    return this.state.isError ? (
      <div>Oops</div>
    ) : (
      this.props.children
    )
  }
}

export { ErrorBoundary }
