'use client'
import React, {useEffect, useState} from 'react'
import TableWrapper from '@/ui/TableWrapper'
import Table from '@/components/Table'
import useSWR from 'swr'
import {Row} from '@/data/types'
import {getRows} from '@/app/api/get-rows/getRows'
import {addRow} from '@/app/api/add-row/addRow'
import {deleteRow} from '@/app/api/delete-row/deleteRow'
import Container from '@/ui/Container'
import Grid from '@/ui/Grid'

function Page() {
    const {data, mutate} = useSWR<Row[]>('api/get-rows', getRows)
    const expenses = data ? data.filter(row => row.type === 'expense') : []
    const incomes = data ? data.filter(row => row.type === 'income') : []
    const budgetStats = data ?
        data.reduce((acc, val) => acc + (val.type === 'income' ? val.amount : 0), 0)
        : 0
    const spentStats = data ?
        data.reduce((acc, val) => acc + (val.type === 'expense' ? val.amount : 0), 0)
        : 0
    const remainingStats = budgetStats - spentStats
    const [rowId, setRowId] = useState(1)

    const statistics = [
        {id: 1, type: 'statistics', name: 'Budget', amount: budgetStats},
        {id: 2, type: 'statistics', name: 'Remaining', amount: remainingStats},
        {id: 3, type: 'statistics', name: 'Spent', amount: spentStats},
    ]

    useEffect(() => {
        if (data) {
            setRowId(data.length + 1)
        }
    }, [data])

    const handleAddRow = async (type: string) => {
        const newRow = {
            id: rowId,
            type: type,
            name: `New ${type}`,
            amount: 0,
        }
        await addRow({...newRow})
        await mutate()
    }

    const handleDeleteRow = async (id: number) => {
        await deleteRow(id)
        await mutate()
    }

    return (
        <Container>
            <TableWrapper addClassName={'w-1/3'}>
                <Table title={'Statistics'} rows={statistics}/>
            </TableWrapper>
            <Grid addClassName={'mt-4'}>
                <TableWrapper>
                    <Table title={'Expenses'} rows={expenses}
                           onAdd={handleAddRow}
                           onDelete={handleDeleteRow}/>
                </TableWrapper>
                <TableWrapper>
                    <Table title={'Incomes'} rows={incomes}
                           onAdd={handleAddRow}
                           onDelete={handleDeleteRow}/>
                </TableWrapper>
            </Grid>
        </Container>
    )
}

export default Page