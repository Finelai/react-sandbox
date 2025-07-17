import { type ReactElement, type FC, type ChangeEvent, useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { formatDate } from '../lib'

import type { IDatesInterval } from '../model'

interface ICallsFiltersProps {
  changeCallDirection: (newSelectVal: string) => void
  setDatesInterval: (newDatesInterval: IDatesInterval) => void
  datesInterval: IDatesInterval
}

const CallsFilters: FC<ICallsFiltersProps> = ({
  changeCallDirection,
  datesInterval,
  setDatesInterval,
}): ReactElement => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(datesInterval.start),
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(datesInterval.end),
  )

  function handleOnTypeChange(selectObj: ChangeEvent<HTMLSelectElement>) {
    changeCallDirection(selectObj.target.value)
  }

  function handleOnDateChange(dates: [Date | null, Date | null]) {
    setStartDate(dates[0] ?? undefined)
    setEndDate(dates[1] ?? undefined)

    if (dates[0] && dates[1]) {
      setDatesInterval({
        start: formatDate(dates[0]),
        end: formatDate(dates[1]),
      })
    }
  }

  return (
    <div className="m-auto w-[95%] max-w-[1440px] flex justify-between">
      <div className="mb-2">
        <select name="select" onChange={handleOnTypeChange}>
          <option value="all">Все типы</option>
          <option value="1">Входящие</option>
          <option value="0">Исходящие</option>
        </select>
      </div>
      <div className="flex">
        <DatePicker
          showIcon
          toggleCalendarOnIconClick
          selectsRange
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={handleOnDateChange}
          shouldCloseOnSelect={true}
          excludeScrollbar
          dateFormat="YYYY/MM/dd"
        />
      </div>
    </div>
  )
}

export { CallsFilters }
