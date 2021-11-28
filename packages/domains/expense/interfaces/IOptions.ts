import { FindOperator } from 'typeorm';

export interface IOptions {

    pagination: {
        limit: number
        skip: number
        currentPage: number
    }
    filter: {
        user_id?: string
        merchant_name?: string | FindOperator<string>
        status?: string
    }
}
