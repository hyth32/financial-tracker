import {NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function GET() {
    try {
        const {rows} = await sql`SELECT * FROM categories`
        if (rows) {
            return new NextResponse(JSON.stringify({error: false, data: rows}))
        } else {
            return new NextResponse(JSON.stringify({error: true, message: 'no rows'}))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({error: error, message: 'unknown error'}))
    }
}