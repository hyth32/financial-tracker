import axios from 'axios'

export async function addExpense({type, name, amount}: { type: string, name: string, amount: number }) {
    const response = await axios.post(
        '/api/add-expense',
        JSON.stringify({type, name, amount}),
    )
    return response.data
}