import { gql } from "@apollo/client";

export const EPOCH_FRAGMENT = gql`
    fragment EpochFields on Epoch {
        id
        pool
        filled
        totalLiquidity
    }
`

export const LIMIT_ORDER_FRAGMENT = gql`
    fragment LimitOrderFields on LimitOrder {
        id
        epoch {
            ...EpochFields
        }
        owner
        pool
        liquidity
        tickLower
        tickUpper
        zeroToOne
}
`

export const LIMIT_ORDERS_LIST = gql`
    query limitOrdersList {
        limitOrders {
            ...LimitOrderFields
        }
    }
`