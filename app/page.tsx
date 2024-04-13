import React from 'react'
import CardWrapper from '@/ui/CardWrapper'
import Table from '@/components/Table'

const expensesTableRows = [
    {type: 'expenses', name: 'Food', amount: 1000},
    {type: 'expenses', name: 'Transportation', amount: 1000},
    {type: 'expenses', name: 'Entertainment', amount: 500},
    {type: 'expenses', name: 'Shopping', amount: 2000},
    {type: 'expenses', name: 'Utilities', amount: 1500}
]

const incomeTableRows = [
    {type: 'income', name: 'Salary', amount: 20000},
    {type: 'income', name: 'Freelance Work', amount: 5000},
    {type: 'income', name: 'Investments', amount: 1000}
]

const statisticsTableRows = [
    {type: 'statistics', name: 'Budget', amount: 1000},
    {type: 'statistics', name: 'Remaining', amount: 800},
    {type: 'statistics', name: 'Spent', amount: 200}
]

function Page() {
    return (
        <div className={'p-8'}>
            <CardWrapper addClassName={'w-1/3'}>
                <Table rows={statisticsTableRows}/>
            </CardWrapper>
            <div className={'flex gap-4 mt-4'}>
                <CardWrapper addClassName={'w-1/2'}>
                    <Table rows={expensesTableRows}/>
                </CardWrapper>
                <CardWrapper addClassName={'w-1/2'}>
                    <Table rows={incomeTableRows}/>
                </CardWrapper>
            </div>
        </div>
    )
}

export default Page