'use client'
import React, {useEffect, useState} from 'react'
import CardWrapper from '@/ui/CardWrapper'
import Table from '@/components/Table'
import axios from 'axios'
import {getIncome} from '@/app/api/get-income/getIncome'
import {getExpenses} from '@/app/api/get-expenses/getExpenses'
import {addExpense} from '@/app/api/add-expense/addExpense'
import {addIncome} from '@/app/api/add-income/addIncome'

const statisticsTableRows = [
    {type: 'statistics', name: 'Budget', amount: 1000},
    {type: 'statistics', name: 'Remaining', amount: 800},
    {type: 'statistics', name: 'Spent', amount: 200},
]

function Page() {
    const [expensesRows, setExpensesRows] = useState([])
    const [incomeRows, setIncomeRows] = useState([])

    useEffect(() => {
        const setExpenses = async () => {
            setExpensesRows(await getExpenses())
        }
        setExpenses()

        const setIncome = async () => {
            setIncomeRows(await getIncome())
        }
        setIncome()
    }, [])

    const handleAddRow = async (type: string) => {
        const newRow = {
            type: type,
            name: 'Mock row',
            amount: 0,
        }
        if (type === 'expenses') {
            await addExpense({...newRow})
            setExpensesRows(await getExpenses())
        }
        if (type === 'income') {
            await addIncome({...newRow})
            setIncomeRows(await getIncome())
        }
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