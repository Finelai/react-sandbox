import { type FC, type ReactElement } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { CallsTable } from './CallsTable'

const queryClient = new QueryClient()

const CallsDashboard: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-main-bg text-text-main text-center">
        <h2 className="leading-10">Звонки в период с по</h2>

        <CallsTable />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export { CallsDashboard }
