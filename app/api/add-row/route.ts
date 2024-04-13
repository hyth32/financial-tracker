import {sql} from '@vercel/postgres'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
    const {type, name, amount} = await request.json()

    try {
        type === 'expenses' ?
            await sql`INSERT INTO Expenses (Type, Name, Amount) VALUES (${type}, ${name}, ${Number(amount)});`
            :
            await sql`INSERT INTO Income (Type, Name, Amount) VALUES (${type}, ${name}, ${Number(amount)});`
        return new NextResponse(JSON.stringify({status: 200}))
    } catch (error) {
        return new NextResponse(JSON.stringify({error: error, status: 500}))
    }
}