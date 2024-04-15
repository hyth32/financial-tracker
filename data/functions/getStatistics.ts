import {Row} from '../types'

export default function getStatistics(data: Row[] | []) {
    const budgetStats = data ?
        data.reduce((acc, val) => acc + (val.type === 'income' ? val.amount : 0), 0) : 0
    const spentStats = data ?
        data.reduce((acc, val) => acc + (val.type === 'expense' ? val.amount : 0), 0)
        : 0
    const remainingStats = budgetStats - spentStats
    return [
        {id: 1, type: 'statistics', name: 'Budget', amount: budgetStats},
        {id: 2, type: 'statistics', name: 'Remaining', amount: remainingStats},
        {id: 3, type: 'statistics', name: 'Spent', amount: spentStats},
    ]
}