export type PaginationQuery = {
    page?: number
    limit?: number
}

export type PrismaPagination = {
    skip: number
    take: number
}

export function getPagination(query: PaginationQuery): PrismaPagination {
    return {
        skip: (query.page && query.limit) ? Number((query.page * query.limit) - query.limit) : 0,
        take: (query.page && query.limit) ? Number(query.limit) : 10
    }
}
