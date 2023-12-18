export interface IUser {
  id: string;
  email: string;
  cpf: string | null;
  address: string | null;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
