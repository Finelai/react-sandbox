export interface IOneCallData {
  id: number
  partnership_id: string
  date: string
  time: number
  to_number: string
  status: 'Дозвонился' | 'Не дозвонился'
  record: string
  in_out: 1 | 0
  source: string
  person_name: string
  person_surname: string
  person_avatar: string
}

export interface ICallsData {
  total_rows: number
  results: IOneCallData[]
}
