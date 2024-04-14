import axios from 'axios'

export async function getRows(url: string) {
    const response = await axios.get(url, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
    return response.data.data
}