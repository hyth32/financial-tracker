import axios from 'axios'

export async function deleteRow(id: number) {
    const response = await axios.post(`api/delete-row?id=${id}`)
    return response.data
}