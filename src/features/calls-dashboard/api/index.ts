import axios from 'axios'

import type { ICallsDataRaw, ICallsData, TCallsScore } from '../model'

const getRandomScore = (): TCallsScore => {
  const scores: TCallsScore[] = ['', 'Отлично', 'Хорошо', 'Плохо']
  const randomIndex = Math.floor(Math.random() * scores.length)
  return scores[randomIndex]
}

const fetchCallsHistory = async (sort?: {
  id: string
  desc: boolean
}): Promise<ICallsData> => {
  let apiUrlGetCallsList =
    'https://api.skilla.ru/mango/getList?date_start=2025-04-05&date_end=2025-04-08&in_out='

  if (sort)
    apiUrlGetCallsList += `&sort_by=${sort.id === 'time' ? 'time' : 'duration'}&order=${sort.desc ? 'DESC' : 'ASC'}`

  const response = await axios.post<ICallsDataRaw>(
    apiUrlGetCallsList,
    {},
    {
      headers: {
        Authorization: `Bearer testtoken`,
      },
    },
  )

  let dataWithRandomScore: ICallsData = {
    total_rows: response.data.total_rows,
    results: [],
  }

  if (response.data.results) {
    dataWithRandomScore = {
      total_rows: response.data.total_rows,
      results: response.data.results.map((item) => ({
        ...item,
        score: getRandomScore(),
      })),
    }
  }

  return dataWithRandomScore
}

export { fetchCallsHistory }
