import { type FC, type ReactElement, useEffect, useState } from 'react'

import { useQuery, queryOptions } from '@tanstack/react-query'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { fetchCallsHistory } from '../api'

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
}

const columnHelper = createColumnHelper<IOneCallData>()

const columns = [
  columnHelper.accessor('date', {
    header: 'Время',
  }),
  columnHelper.accessor('person_avatar', {
    header: 'Сотрудник',
  }),
  columnHelper.accessor('to_number', {
    header: 'Звонок',
  }),
  columnHelper.accessor('source', {
    header: 'Источник',
  }),
  columnHelper.accessor('time', {
    header: 'Длительность',
  }),
]

const callsQueryOptions = () =>
  queryOptions({
    queryKey: ['calls'],
    queryFn: fetchCallsHistory,
  })

const CallsTable: FC = (): ReactElement => {
  const [cellsData, setCellsData] = useState<IOneCallData[]>()
  const query = useQuery(callsQueryOptions())
  const table = useReactTable({
    data:
      cellsData ??
      Array(5)
        .fill(null)
        .map(() => ({ ...placeholderOneCellData })),
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { isPending, error, data } = query

  useEffect(() => {
    if (data?.results) setCellsData(data.results)
  }, [data])

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Table</h1>
      <p>{data.total_rows}</p>
      <table>
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { CallsTable }
