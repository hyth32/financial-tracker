import axios from 'axios'

type updateRowProps = {
    id: number,
    field: string,
    value: string
}

export async function updateRow({id, field, value}: updateRowProps) {
    // console.log(id, field, value)
    const response = await axios.post(
        `api/update-row`,
        JSON.stringify({id, field, value}),
    )
    return response.data
}