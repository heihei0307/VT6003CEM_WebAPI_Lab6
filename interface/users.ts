export interface iUsers {
  id: number
  firstname?: string
  lastname?: string
  username:string
  about?:string
  dateregistered: Date
  password?: string
  passwordsalt?: string
  email: string
  avatarurl?: string
}

export interface iUsersArray extends Array<iUsers> { }