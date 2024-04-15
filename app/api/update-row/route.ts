import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function POST(request: NextRequest) {
    const {id, field, value} = await request.json()

    try {
        if (field === 'name') {
            await sql`UPDATE finances SET name=${value} WHERE id=${id}`
        } else if (field === 'amount') {
            await sql`UPDATE finances SET amount=${value} WHERE id=${id}`
        } else {
            return new NextResponse(JSON.stringify({error: true, message: 'field doesn\'t exist'}))
        }
        return new NextResponse(JSON.stringify({error: false}))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: 'unknown error'}))
    }
}