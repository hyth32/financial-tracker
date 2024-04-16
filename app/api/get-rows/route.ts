import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const type = searchParams.get('type')?.toLowerCase()

    try {
        if (type) {
            if (type === 'expenses') {
                const {rows} = await sql`SELECT * FROM finances WHERE type = 'expense' ORDER BY id`
                return new NextResponse(JSON.stringify({data: rows, error: false}))
            } else if (type === 'incomes') {
                const {rows} = await sql`SELECT * FROM finances WHERE type = 'income' ORDER BY id`
                return new NextResponse(JSON.stringify({data: rows, error: false}))
            } else if (type === 'all') {
                const {rows} = await sql`SELECT * FROM finances ORDER BY id`
                return new NextResponse(JSON.stringify({data: rows, error: false}))
            } else if (type === 'count') {
                const {rows} = await sql`SELECT COUNT(*) FROM finances`
                return new NextResponse(JSON.stringify({data: rows[0]}))
            }
            else return new NextResponse(JSON.stringify({error: true, message: 'rows don\'t exist'}))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}