import type { FC, ReactElement } from 'react'

import { CallsDashboard } from '@features/calls-dashboard'

const Calls: FC = (): ReactElement => (
  <section>
    <CallsDashboard />
  </section>
)

export { Calls }
