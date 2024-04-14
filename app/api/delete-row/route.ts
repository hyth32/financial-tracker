import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function POST(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')

    try {
        if (!id) {
            return new NextResponse(JSON.stringify({error: true, message: 'id wasn\'t specified'}))
        }
        const {rows} = await sql`SELECT FROM finances WHERE id=${id}`
        if (rows.length > 0) {
            await sql`DELETE FROM finances WHERE id=${id}`
            return new NextResponse(JSON.stringify({error: false}))
        } else {
            return new NextResponse(JSON.stringify({error: true, message: 'id doesn\'t exist'}))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}