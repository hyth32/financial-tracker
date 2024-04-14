'use client'
import React, {useState} from 'react'
import CardWrapper from '@/ui/CardWrapper'
import Table from '@/components/Table'
import useSWR from 'swr'
import {Row} from '@/data/types'
import {getRows} from '@/app/api/get-rows/getRows'
import {addRow} from '@/app/api/add-row/addRow'
import {deleteRow} from '@/app/api/delete-row/deleteRow'

const statisticsTableRows = [
    {id: 1, type: 'statistics', name: 'Budget', amount: 1000},
    {id: 2, type: 'statistics', name: 'Remaining', amount: 800},
    {id: 3, type: 'statistics', name: 'Spent', amount: 200},
]

function Page() {
    const {data, mutate} = useSWR<Row[]>('api/get-rows', getRows, {revalidateOnFocus: true})
    const expenses = data ? data.filter(row => row.type === 'expense') : []
    const incomes = data ? data.filter(row => row.type === 'income') : []
    const [rowId, setRowId] = useState(1)

    const handleAddRow = async (type: string) => {
        const newRow = {
            id: rowId,
            type: type,
            name: `new ${type}`,
            amount: 0,
        }
        await addRow({...newRow})
        await mutate()
        setRowId(id => id + 1)
    }

    const handleDeleteRow = async (id: number) => {
        await deleteRow(id)
        await mutate()
    }

    return (
        <div className={'p-8'}>
            <CardWrapper addClassName={'w-1/3'}>
                <Table title={'Statistics'} rows={statisticsTableRows}/>
            </CardWrapper>
            <div className={'flex gap-4 mt-4'}>
                <CardWrapper addClassName={'w-1/2 relative'}>
                    <button onClick={() => handleAddRow('expense')}
                            className={'absolute right-6 top-6 py-1 px-3 rounded-lg font-medium bg-zinc-100 hover:bg-zinc-200 transition-all'}>
                        Add
                    </button>
                    <Table title={'Expenses'} rows={expenses} onDelete={handleDeleteRow}/>
                </CardWrapper>
                <CardWrapper addClassName={'w-1/2 relative'}>
                    <button onClick={() => handleAddRow('income')}
                            className={'absolute right-6 top-6 py-1 px-3 rounded-lg font-medium bg-zinc-100 hover:bg-zinc-200 transition-all'}>
                        Add
                    </button>
                    <Table title={'Income'} rows={incomes} onDelete={handleDeleteRow}/>
                </CardWrapper>
            </div>
        </div>
    )
}

export default Page