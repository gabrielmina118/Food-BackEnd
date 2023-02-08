interface Type {
  [key: string]: string | number;
};

export interface ICreateUser extends Type {
  name: string;
  email: string;
  cpf: string;
  password: string;
}
