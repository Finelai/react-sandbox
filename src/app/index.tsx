import type { FC, ReactElement } from 'react'

import { ErrorBoundary } from '@shared/ui/error-boundary'
import { Router } from '@pages/index'

const App: FC = (): ReactElement => {
  return (
    <ErrorBoundary>
      <div className="app-wrapper">
        <Router />
      </div>
    </ErrorBoundary>
  )
}

export default App
