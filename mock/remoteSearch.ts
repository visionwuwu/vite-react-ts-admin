import {MockMethod} from 'vite-plugin-mock'
import {ResponseData} from './index'

type TagType = 'success' | 'pending'

/** api urls */
enum TransactionUrls {
  transactionListUrl = '/transaction/list',
}

export interface TransactionProps {
  key: number
  order_no: string
  price?: number
  tag?: TagType
}

const list: TransactionProps[] = [
  {
    key: 2204,
    order_no: 'D28CA823-C7bf-9b9a-fbbF-124dfDFB52B2',
    price: 9123.55,
    tag: 'success',
  },
  {
    key: 2205,
    order_no: 'dbce34dc-Fd85-5672-bC9f-4BCb3b3fbdEc',
    price: 14311.4,
    tag: 'success',
  },
  {
    key: 2206,
    order_no: 'Dadc4FcE-706F-ffCF-EE69-79f79dC1e4F7',
    price: 11124.6,
    tag: 'success',
  },
  {
    key: 2207,
    order_no: 'AB1D14fE-F35F-84a3-A1BE-75e85ef69861',
    price: 5299.87,
    tag: 'pending',
  },
  {
    key: 2208,
    order_no: '70D8cfeD-1e6C-184F-eAee-Cc8517bcc8E0',
    price: 12419,
    tag: 'pending',
  },
  {
    key: 2209,
    order_no: '3Ef48E38-F714-6D5B-C22b-aCF2dA4cB6D7',
    price: 11994.18,
    tag: 'pending',
  },
  {
    key: 2210,
    order_no: '29d8EAcC-fDeC-7Abe-edC9-fAb02120DBA8',
    price: 12687.2,
    tag: 'pending',
  },
  {
    key: 2211,
    order_no: 'bBdFAcd1-6FA9-271C-F24A-e7478d5Bf534',
    price: 4551.84,
    tag: 'pending',
  },
  {
    key: 2212,
    order_no: 'ECc478B2-eaCE-A52C-440D-DAe7b123846c',
    price: 12230.54,
    tag: 'success',
  },
  {
    key: 2213,
    order_no: 'cCe1E869-4D2F-2A9E-bc9b-f6b894baf8D4',
    price: 6468.46,
    tag: 'pending',
  },
  {
    key: 2214,
    order_no: '8521C0df-b76B-bFBc-cB23-01c34AFf2Fd0',
    price: 10924.04,
    tag: 'pending',
  },
  {
    key: 2215,
    order_no: 'fFeAd47f-42dc-06e7-6df8-811aB2fb3a1f',
    price: 12574.1,
    tag: 'success',
  },
  {
    key: 2216,
    order_no: '3A7f248F-1E99-1a74-2Df9-458bfEBe1D55',
    price: 13821.17,
    tag: 'pending',
  },
  {
    key: 2217,
    order_no: '3B939bfF-beCD-b39c-7b2F-cEbDfDF517B6',
    price: 5370.33,
    tag: 'success',
  },
  {
    key: 2218,
    order_no: '4b685764-F745-6cF2-4Bc7-BEEC2A2Fb66F',
    price: 14661.3,
    tag: 'success',
  },
  {
    key: 2219,
    order_no: '6D7AAB2B-F975-E0fA-7C0C-2f7C42f34b65',
    price: 9912.2,
    tag: 'success',
  },
  {
    key: 2220,
    order_no: '772A8ED7-DCD1-fA97-cbBb-1dA8Aa35dE7B',
    price: 1109.7,
    tag: 'pending',
  },
  {
    key: 2221,
    order_no: 'EC3d62ae-90c4-3E4f-72Ce-6A2FfDFBBcdD',
    price: 5093.5,
    tag: 'success',
  },
  {
    key: 2222,
    order_no: '4bF63315-CdB9-8B7F-ED47-cBfC215A1F4E',
    price: 7769.2,
    tag: 'success',
  },
  {
    key: 2223,
    order_no: 'cbdaF666-7D68-daE0-44fA-9EA31c5A5e6F',
    price: 11468,
    tag: 'pending',
  },
]

export default [
  // mock transaction list
  {
    url: TransactionUrls.transactionListUrl,
    method: 'get',
    response: () => {
      return {
        code: 20000,
        data: list,
      } as ResponseData
    },
  },
] as MockMethod[]
