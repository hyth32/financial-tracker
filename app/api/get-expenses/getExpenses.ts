import axios from 'axios'

export async function getExpenses(url: string) {
    const response = await axios.get(url)
    return response.data.data
}