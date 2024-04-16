export type Row = {
    id: number,
    type: string,
    name: string,
    amount: number,
    category_id?: number | null
}

export type Category = {
    id: number,
    type: string,
    category: string
}