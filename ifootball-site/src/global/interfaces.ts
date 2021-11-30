export interface IProduct {
  _id: string
  title: string
  image: string
  price: string
  quantity: number
}

export interface ILogin {
  user: string
  password: string
}

export interface IUser {
  _id: string
  name: string
  cpf: string
  email: string
  password: string
}

export interface IPurchases {
  _id: string
  endereco: string
  telefone: string
  userId: string
  selectedProductIds: string
  selectedProductQtds: string
}

export interface ILogin {
  email: string
  password: string
}

export interface ISignup extends ILogin {
  email: string
  cpf: string
}