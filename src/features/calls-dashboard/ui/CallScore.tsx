import type { ReactElement } from 'react'

import type { TCallsScore } from '../model'

const CallScore = (score: TCallsScore): ReactElement => {
  if (score === 'Отлично')
    return (
      <div className="inline-block border border-[#28A879] bg-[#DBF8EF] rounded-sm px-2 py-1.5">
        <p className="text-[#00A775]">{score}</p>
      </div>
    )

  if (score === 'Хорошо')
    return (
      <div className="inline-block border border-[#ADBFDF] bg-[#D8E4FB] rounded-sm px-2 py-1.5">
        <p className="text-[#122945]">{score}</p>
      </div>
    )

  if (score === 'Плохо')
    return (
      <div className="inline-block border border-[#EA1A4F] bg-[#FEE9EF] rounded-sm px-2 py-1.5">
        <p className="text-[#EA1A4F]">{score}</p>
      </div>
    )

  return (
    <div>
      <p>&nbsp;</p>
    </div>
  )
}

export { CallScore }
