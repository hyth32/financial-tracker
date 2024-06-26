import axios from 'axios'

export async function getCategories(url: string) {
    const response = await axios.get(url)
    return response.data.data
}