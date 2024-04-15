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
import getStatistics from '@/data/functions/getStatistics'
import {updateRow} from '@/app/api/update-row/updateRow'

function Page() {
    const {data, mutate} = useSWR<Row[]>('api/get-rows', getRows)
    const expenses = data ? data.filter(row => row.type === 'expense') : []
    const incomes = data ? data.filter(row => row.type === 'income') : []
    const statistics = getStatistics(data ? data : [])
    const [rowId, setRowId] = useState(1)

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

    const handleEditRow = async ({id, field, value}: { id: number, field: string, value: string }) => {
        await updateRow({id, field, value})
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
                           onDelete={handleDeleteRow}
                           onEdit={handleEditRow}
                    />
                </TableWrapper>
                <TableWrapper>
                    <Table title={'Incomes'} rows={incomes}
                           onAdd={handleAddRow}
                           onDelete={handleDeleteRow}
                           onEdit={handleEditRow}
                    />
                </TableWrapper>
            </Grid>
        </Container>
    )
}

export default Page