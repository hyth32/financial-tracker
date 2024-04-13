import axios from 'axios'

export async function addIncome({type, name, amount}: { type: string, name: string, amount: number }) {
    const response = await axios.post(
        '/api/add-income',
        JSON.stringify({type, name, amount}),
    )
    return response.data
}