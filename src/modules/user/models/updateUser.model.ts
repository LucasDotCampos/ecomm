enum EnumRole {
  admin,
  client,
}
export interface IUpdateUser {
  admin: string;
  id: string;
  role: EnumRole;
}
