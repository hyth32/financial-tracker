import {sql} from '@vercel/postgres'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
    const {id, type, name, amount} = await request.json()
    const validTypes = ['expense', 'income']

    try {
        if (!id || !type || !name) {
            return new NextResponse(JSON.stringify({error: true, message: 'not enough fields'}))
        }
        if (validTypes.includes(type)) {
            await sql`INSERT INTO finances (id, type, name, amount) VALUES (${id}, ${type}, ${name}, ${amount})`
            return new NextResponse(JSON.stringify({error: false}))
        } else {
            return new NextResponse(JSON.stringify({error: true, message: 'type is not valid'}))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}