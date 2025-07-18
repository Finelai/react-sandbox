import type { FC, ReactElement } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { CallsTable } from './CallsTable'

const queryClient = new QueryClient()

const CallsDashboard: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-main-bg text-text-main text-center pt-4">
        <CallsTable />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export { CallsDashboard }
