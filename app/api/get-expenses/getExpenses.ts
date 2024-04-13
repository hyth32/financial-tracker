import axios from 'axios'

export async function getExpenses() {
    const response = await axios.get('/api/get-expenses')
    return response.data.data
}