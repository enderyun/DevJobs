type UserId = {
readonly id: string | number
}

export type User = {
  readonly name: string;
  readonly age: number;
  email?: string;
  company?: Company
  role: "admin" | "user" | "editor"
}

export type UserEntity = User & UserId

export type Company = {
  name: string;
  address: string;
  phone?: string;
}



