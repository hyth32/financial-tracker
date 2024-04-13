import {sql} from '@vercel/postgres'
import {NextResponse} from 'next/server'

export async function GET(request: Request) {
    try {
        const {rows} = await sql`SELECT * FROM Income`
        return new NextResponse(JSON.stringify({data: rows, status: 200}))
    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}