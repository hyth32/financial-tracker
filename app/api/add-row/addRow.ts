import axios from 'axios'
import {Row} from '@/data/types'

export async function addRow({id, type, name, amount}: Row) {
    const response = await axios.post(
        '/api/add-row',
        JSON.stringify({id, type, name, amount}),
    )
    return response.data
}