
export interface PaginationResponse<T> {
    items: T[];
    pageNumber: number;
    totalCount: number;
    pageSize: number;
    totalPages: number;
}