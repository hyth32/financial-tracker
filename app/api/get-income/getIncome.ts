import axios from 'axios'

export async function getIncome(url: string) {
    const response = await axios.get(url)
    return response.data.data
}