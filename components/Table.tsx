'use client'
import React, {useEffect, useState} from 'react'
import Title from '@/ui/Title'
import TableRow from '@/ui/TableRow'
import {Category, Row} from '@/data/types'
import Button from '@/ui/Button'
import useSWR from 'swr'
import {getRows} from '@/app/api/get-rows/getRows'
import {deleteRow} from '@/app/api/delete-row/deleteRow'
import getStatistics from '@/data/functions/getStatistics'
import {addRow} from '@/app/api/add-row/addRow'
import {updateRow} from '@/app/api/update-row/updateRow'
import {selectCategory} from '@/app/api/select-category/selectCategory'

type TableProps = {
    title: string
}

function Table({title}: TableProps) {
    const {data: rowsData, mutate: mutateRows} = useSWR<Row[]>(`api/get-rows?type=${title}`, getRows)
    const {data: count, mutate: mutateCount} = useSWR<{ count: number }>('/api/get-rows?type=count', getRows)
    const rowType = title.toLowerCase().slice(0, -1)
    const [statistics, setStatistics] = useState<Row[]>([])
    const rows = rowsData ? rowsData : []
    const isStats = title.toLowerCase() === 'statistics'

    useEffect(() => {
        if (rowsData) {
            setStatistics(getStatistics(rowsData))
        }
    }, [rowsData])

    const handleAddRow = async (id: number, type: string) => {
        const newRow = {
            id: id,
            type: type,
            name: `New ${type}`,
            amount: 0,
        }
        await addRow({...newRow}).then(() => mutateRows().then(() => mutateCount()))
        await mutateCount()
    }

    const handleDeleteRow = async (id: number) => {
        await deleteRow(id)
        await mutateRows()
    }

    const handleEditRow = async ({id, field, value}: { id: number, field: string, value: string }) => {
        await updateRow({id, field, value})
        await mutateRows()
    }

    const handleSelectCategory = async ({id, type, category}: Category) => {
        await selectCategory({id, type, category})
        await mutateRows()
    }

    return (
        <div>
            <Title type={'h2'} content={title} addClassName={'mb-4'}/>
            {!isStats &&
                <>
                    <Button onClick={() => handleAddRow(count?.count ?? 1, rowType)}
                            addClassName={'py-1 px-3 rounded-lg absolute right-6 top-6'}>
                        Add
                    </Button>
                    <TableRow type={title.toLowerCase()}/>
                </>
            }
            {rows.length > 0 ?
                rows.map(row => (
                    <TableRow key={row.id} {...row} onDelete={() => handleDeleteRow(row.id)}
                              onEdit={handleEditRow}
                              onCategory={handleSelectCategory}
                    />
                ))
                :
                <p className={'py-4'}>No data</p>
            }
        </div>
    )
}

export default Table