import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function POST(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const rowId = searchParams.get('id')
    const type = searchParams.get('type')
    const category = searchParams.get('category')

    if (!rowId || !category) {
        return new NextResponse(JSON.stringify({error: true, message: 'not enough params'}))
    }

    try {
        await sql`UPDATE finances SET category_id=(SELECT id FROM categories WHERE name=${category} AND type=${type}) WHERE id=${rowId}`
        return new NextResponse(JSON.stringify({error: false}))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: 'unknown error'}))
    }
}