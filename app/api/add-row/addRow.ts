import axios from 'axios'

export async function addRow({type, name, amount}: { type: string, name: string, amount: number }) {
    const response = await axios.post(
        '/api/add-row',
        JSON.stringify({type, name, amount}),
    )
    return response.data
}