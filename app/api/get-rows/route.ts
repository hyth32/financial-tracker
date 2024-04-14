import {NextRequest, NextResponse} from 'next/server'
import {sql} from '@vercel/postgres'

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const type = searchParams.get('type')

    try {
        if (type) {
            if (type === 'expenses') {
                const {rows} = await sql`SELECT * FROM finances WHERE type = 'expense'`
                return new NextResponse(JSON.stringify({data: rows, error: false}))
            }
            else if (type === 'incomes') {
                const {rows} = await sql`SELECT * FROM finances WHERE type = 'income'`
                return new NextResponse(JSON.stringify({data: rows, error: false}))
            }
            else return new NextResponse(JSON.stringify({error: true, message: 'rows don\'t exist'}))
        } else {
            const {rows} = await sql`SELECT * FROM finances`
            return new NextResponse(JSON.stringify({data: rows, error: false}))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({error: true, message: error}))
    }
}