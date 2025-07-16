import type { ReactElement } from 'react'

import inIcon from '@assets/call-types/in.png'
import outIcon from '@assets/call-types/out.png'
import notIcon from '@assets/call-types/not.png'
import skipIcon from '@assets/call-types/skip.png'

interface ICallTypesMapVal {
  name: string
  icon: string
}

const CallType = (
  status: 'Дозвонился' | 'Не дозвонился',
  in_out: 0 | 1,
): ReactElement => {
  const callTypesMap: Record<string, ICallTypesMapVal> = {
    Дозвонился_1: { name: 'Входящие', icon: inIcon },
    Дозвонился_0: { name: 'Исходящие', icon: outIcon },
    'Не дозвонился_1': { name: 'Пропущенные', icon: skipIcon },
    'Не дозвонился_0': { name: 'Недозвон', icon: notIcon },
  }

  return (
    <div>
      <img
        src={callTypesMap[`${status}_${in_out}`].icon}
        alt={callTypesMap[`${status}_${in_out}`].name}
      />
    </div>
  )
}

export { CallType }
