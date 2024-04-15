import axios from 'axios'

export async function selectCategory({id, type, category}: { id: number, type: string, category: string }) {
    const response = await axios.post(
        `api/select-category?id=${id}&type=${type}&category=${category}`
    )
    return response.data
}