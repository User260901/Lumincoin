export type TableResponseType = {
    id: number,
    type: string,
    amount: number,
    date: string,
    comment?: string,
    category: "income" | "expense"
}