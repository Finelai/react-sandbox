import type { FC, ReactElement } from 'react'

import { NOT_FOUND_TEXT } from '@shared/config'

const NotFound: FC = (): ReactElement => (
  <div>
    <h1>{NOT_FOUND_TEXT}</h1>
  </div>
)

export { NotFound }
