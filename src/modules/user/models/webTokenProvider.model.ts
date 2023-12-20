interface IJwtPayload {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}
export interface IWebTokenProvider {
  create(userId: string): Promise<string>;
  verify(userId: string): Promise<string | IJwtPayload>;
}
