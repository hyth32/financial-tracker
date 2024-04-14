'use client'
import React, {useState} from 'react'
import TableWrapper from '@/ui/TableWrapper'
import Table from '@/components/Table'
import useSWR from 'swr'
import {Row} from '@/data/types'
import {getRows} from '@/app/api/get-rows/getRows'
import {addRow} from '@/app/api/add-row/addRow'
import {deleteRow} from '@/app/api/delete-row/deleteRow'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import Grid from '@/ui/Grid'

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
            name: `New ${type}`,
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
        <Container>
            <TableWrapper addClassName={'w-1/3'}>
                <Table title={'Statistics'} rows={statisticsTableRows}/>
            </TableWrapper>
            <Grid addClassName={'mt-4'}>
                <TableWrapper>
                    <Button onClick={() => handleAddRow('expense')}
                            addClassName={'absolute right-6 top-6 py-1 px-3 rounded-lg'}>
                        Add
                    </Button>
                    <Table title={'Expenses'} rows={expenses} onDelete={handleDeleteRow}/>
                </TableWrapper>
                <TableWrapper>
                    <Button onClick={() => handleAddRow('income')}
                            addClassName={'absolute right-6 top-6 py-1 px-3 rounded-lg'}>
                        Add
                    </Button>
                    <Table title={'Incomes'} rows={incomes} onDelete={handleDeleteRow}/>
                </TableWrapper>
            </Grid>
        </Container>
    )
}

export default Page