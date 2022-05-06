export interface IPaginatedResponse {
  pagination: {
    itemsPerPage: number
    currentPage: number
    numberOfPages: number
  }
}
