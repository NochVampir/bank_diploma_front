export type TLoginPayload = {
  nickname: string
  password: string
}

export type TLoginResponse = {
  token: string
// refreshToken: string
}

export type TRegisterPayload = TLoginPayload

export type TRegisterResponse = {
  id: number
  login: string
  amount: number
}

export type TProfileDetailsResponse = {
  nickname: string
  id: number
  amount: string
}

export type TSendTransactionPayload = {
  senderId: number
  recipientId: number
  cost: number
}

export type TSendTransactionResponse = {
  cost: number
  id: number
}

export type TUserTransactionsPayload = {
  id: number
  sort?: {
    name: string
    dir: string
  }
}

export type TUserTransactionsResponse = {
  cost: number
  id: number
  senderId: number
  sender: {
    id: number
    nickname: string
  }
  recipient: {
    id: number
    nickname: string
  }
  createdAt: string
}[]

export type TFindByNumberTransactionPayload = {
  number: string
}

export type TFindByNumberTransactionResponse = {
  id: number
}

export type TUserSuggestionsPayload = {
  q: string
}

export type TUserSuggestionsResponse = {
  id: number
  nickname: string
}[]

export type TProfileLastActivityResponse = {
  type: 'increase' | 'decrease',
  value?: number
}[]

export type TReplenishBalancePayload = {
  cost: number
}
