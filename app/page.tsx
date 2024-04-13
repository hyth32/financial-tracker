'use client'
import React, {useEffect, useState} from 'react'
import CardWrapper from '@/ui/CardWrapper'
import Table from '@/components/Table'
import {getIncome} from '@/app/api/get-income/getIncome'
import {getExpenses} from '@/app/api/get-expenses/getExpenses'
import {addRow} from '@/app/api/add-row/addRow'
import {Row} from '@/app/data/types'

const statisticsTableRows = [
    {type: 'statistics', name: 'Budget', amount: 1000},
    {type: 'statistics', name: 'Remaining', amount: 800},
    {type: 'statistics', name: 'Spent', amount: 200},
]

function Page() {
    const [expensesRows, setExpensesRows] = useState<Row[]>([])
    const [incomeRows, setIncomeRows] = useState<Row[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const expenses = await getExpenses()
            setExpensesRows(expenses)

            const income = await getIncome()
            setIncomeRows(income)
        }
        fetchData()
    }, [])

    const handleAddRow = async (type: string) => {
        const newRow = {
            type: type,
            name: 'Mock row',
            amount: 0,
        }
        await addRow({...newRow})
    }

    return (
        <div className={'p-8'}>
            <CardWrapper addClassName={'w-1/3'}>
                <Table title={'Statistics'} rows={statisticsTableRows}/>
            </CardWrapper>
            <div className={'flex gap-4 mt-4'}>
                <CardWrapper addClassName={'w-1/2 relative'}>
                    <button onClick={() => handleAddRow('expenses')}
                            className={'absolute right-6 top-6 py-1 px-3 rounded-lg font-medium bg-zinc-100 hover:bg-zinc-200 transition-all'}>
                        Add
                    </button>
                    <Table title={'Expenses'} rows={expensesRows}/>
                </CardWrapper>
                <CardWrapper addClassName={'w-1/2 relative'}>
                    <button onClick={() => handleAddRow('income')}
                            className={'absolute right-6 top-6 py-1 px-3 rounded-lg font-medium bg-zinc-100 hover:bg-zinc-200 transition-all'}>
                        Add
                    </button>
                    <Table title={'Income'} rows={incomeRows}/>
                </CardWrapper>
            </div>
        </div>
    )
}

export default Page