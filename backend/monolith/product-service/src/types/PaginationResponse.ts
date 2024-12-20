export interface PaginationResponse<T> {
    products: T[];
    pagination: {
      total: number;
      currentPage: number;
      totalPages: number;
      hasMore: boolean;
    };
  }