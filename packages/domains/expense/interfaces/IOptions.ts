// eslint-disable-next-line import/no-extraneous-dependencies
import * as typeorm from 'typeorm';

export interface IOptions {
    pagination: {
        limit: number
        skip: number
        currentPage: number
    }
    filter?: {
        user_id?: string
        merchant_name?: string | typeorm.FindOperator<string>
        status?: string
    }
}
