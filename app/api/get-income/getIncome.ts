import axios from 'axios'

export async function getIncome() {
    const response = await axios.get('/api/get-income')
    return response.data.data
}