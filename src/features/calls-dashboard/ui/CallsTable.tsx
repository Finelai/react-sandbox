import { type FC, type ReactElement, useEffect, useState } from 'react'

import { useQuery, queryOptions } from '@tanstack/react-query'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/react-table'

import { fetchCallsHistory } from '../api'
import { formatSecondsToMinutes, formatDate } from '../lib'
import { CallType } from './CallType'
import { CallScore } from './CallScore'
import { SortIcon } from './SortIcon'
import { CallsFilters } from './CallsFilters'

import type { IOneCallData, IDatesInterval } from '../model'

const placeholderOneCellData: IOneCallData = {
  id: 0,
  partnership_id: '',
  date: '',
  time: 0,
  to_number: '',
  status: 'Дозвонился',
  record: '',
  in_out: 1,
  source: '',
  person_name: '',
  person_surname: '',
  person_avatar: 'https://lk.skilla.ru/img/noavatar.jpg',
  score: 'Хорошо',
}

const defaultDateInterval = (): IDatesInterval => {
  const today = new Date()
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(today.getDate() - 2)

  return {
    start: formatDate(twoDaysAgo),
    end: formatDate(today),
  }
}

const columnHelper = createColumnHelper<IOneCallData>()

const columns = [
  columnHelper.accessor('in_out', {
    header: 'Тип',
    cell: ({ cell, row }) => CallType(row.original.status, cell.getValue()),
    enableSorting: false,
  }),
  columnHelper.accessor('date', {
    header: 'Время',
    cell: ({ cell }) => {
      const dateString = cell.getValue()
      if (dateString) {
        const isoString = dateString.replace(' ', 'T')
        const date = new Date(isoString)
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // чтобы использовать 24-часовой формат
        }
        const userLocale =
          navigator.languages && navigator.languages.length > 0
            ? navigator.languages[0]
            : navigator.language

        return new Intl.DateTimeFormat(userLocale, options).format(date)
      }
    },
    enableSorting: true,
  }),
  columnHelper.accessor('person_avatar', {
    header: 'Сотрудник',
    cell: ({ cell, row }) => (
      <div>
        <img
          className="rounded-full"
          src={cell.getValue()}
          alt={`${row.original.person_name} ${row.original.person_surname}`}
        />
      </div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('to_number', {
    header: 'Звонок',
    enableSorting: false,
  }),
  columnHelper.accessor('source', {
    header: 'Источник',
    enableSorting: false,
  }),
  columnHelper.accessor('score', {
    header: 'Оценка',
    cell: ({ cell }) => CallScore(cell.getValue()),
    enableSorting: false,
  }),
  columnHelper.accessor('time', {
    header: 'Длительность',
    cell: ({ cell }) => formatSecondsToMinutes(cell.getValue()),
    enableSorting: true,
  }),
]

const callsQueryOptions = (
  datesInterval: IDatesInterval,
  callDirection: string,
  sort?: { id: string; desc: boolean },
) =>
  queryOptions({
    queryKey: ['calls', datesInterval, callDirection, sort],
    queryFn: () => fetchCallsHistory(datesInterval, callDirection, sort),
  })

const CallsTable: FC = (): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [cellsData, setCellsData] = useState<IOneCallData[]>()
  const [callDirection, setCallDirection] = useState<string>('')
  const [datesInterval, setDatesInterval] = useState<IDatesInterval>(
    defaultDateInterval(),
  )

  const sort = sorting.length > 0 ? sorting[0] : undefined
  const query = useQuery(callsQueryOptions(datesInterval, callDirection, sort))
  const table = useReactTable({
    data:
      cellsData ??
      Array(5)
        .fill(null)
        .map(() => ({ ...placeholderOneCellData })),
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  })

  const { isPending, error, data } = query

  useEffect(() => {
    if (data?.results) setCellsData(data.results)
  }, [data])

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <h1 id="calls-dashboard-title">Calls Dashboard</h1>
      <CallsFilters
        changeCallDirection={setCallDirection}
        datesInterval={datesInterval}
        setDatesInterval={setDatesInterval}
      />
      <div className="inline-block bg-table-bg rounded-2xl shadow-md w-[95%] max-w-[1440px] pb-4 mb-16">
        <div className="min-w-full">
          <div>
            {table?.getHeaderGroups().map((headerGroup) => (
              <div
                key={headerGroup.id}
                className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-6 items-center py-3 px-4 text-left text-xs font-normal text-text-secondary tracking-wider border-b border-gray-200 leading-6"
              >
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const isSorted = header.column.getIsSorted()

                  return (
                    <div
                      key={header.id}
                      className={`truncate ${canSort ? 'cursor-pointer select-none' : ''}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      {canSort && <SortIcon isSorted={isSorted} />}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="bg-white divide-y divide-gray-200 relative">
            {isPending && (
              <div className="absolute w-full h-full z-10 bg-[rgba(0,0,0,0.6)] flex items-center justify-center text-white">
                Loading...
              </div>
            )}

            {table?.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-6 items-center py-4 px-4 text-left text-sm text-gray-900 hover:bg-[#D4DFF32B]"
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export { CallsTable }
