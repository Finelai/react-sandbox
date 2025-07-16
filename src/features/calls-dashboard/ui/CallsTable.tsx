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
import { formatSecondsToMinutes } from '../lib'
import { CallType } from './CallType'
import { CallScore } from './CallScore'
import { SortIcon } from './SortIcon'

import type { IOneCallData } from '../model'

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
  person_avatar: '',
  score: 'Хорошо',
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

const callsQueryOptions = (sort?: { id: string; desc: boolean }) =>
  queryOptions({
    queryKey: ['calls', sort],
    queryFn: () => fetchCallsHistory(sort),
  })

const CallsTable: FC = (): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [cellsData, setCellsData] = useState<IOneCallData[]>()
  const sort = sorting.length > 0 ? sorting[0] : undefined
  const query = useQuery(callsQueryOptions(sort))
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

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
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
        <div className="bg-white divide-y divide-gray-200">
          {table?.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-6 items-center py-4 px-4 text-left text-sm text-gray-900"
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
  )
}

export { CallsTable }
