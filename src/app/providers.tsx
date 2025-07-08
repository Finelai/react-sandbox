import { StrictMode, type ReactElement } from 'react'
import { BrowserRouter } from 'react-router'

import { ErrorBoundary } from '@shared/ui/error-boundary'

const Providers = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <StrictMode>
      <BrowserRouter>
        <ErrorBoundary>{children}</ErrorBoundary>
      </BrowserRouter>
    </StrictMode>
  )
}

export default Providers
