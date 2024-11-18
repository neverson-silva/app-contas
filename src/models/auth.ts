export type Pessoa = {
  id: number
  nome: string
  sobrenome: string
  dataNascimento?: Date
  perfil: string
}

export type Usuario = {
  id: number
  email: string
  senha?: string
  pessoa: Pessoa
}
