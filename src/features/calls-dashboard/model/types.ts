export interface IOneCallDataRaw {
  id: number
  partnership_id: string
  date: string
  time: number // в секундах
  to_number: string
  status: 'Дозвонился' | 'Не дозвонился'
  record: string
  in_out: 1 | 0
  source: string
  person_name: string
  person_surname: string
  person_avatar: string
}

export interface ICallsDataRaw {
  total_rows: number
  results: IOneCallDataRaw[]
}

export type TCallsScore = '' | 'Отлично' | 'Хорошо' | 'Плохо'

export interface IOneCallData extends IOneCallDataRaw {
  score: TCallsScore
}

export interface ICallsData {
  total_rows: number
  results: IOneCallData[]
}
