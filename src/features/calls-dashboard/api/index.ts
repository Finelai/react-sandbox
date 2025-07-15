import axios from 'axios'

import type { ICallsData } from '../model'

const fetchCallsHistory = async () => {
  const response = await axios.post<ICallsData>(
    'https://api.skilla.ru/mango/getList?date_start=2025-04-05&date_end=2025-04-08&in_out=',
    {},
    {
      headers: {
        Authorization: `Bearer testtoken`,
      },
    },
  )

  console.log(response.data)

  return response.data
}

export { fetchCallsHistory }
