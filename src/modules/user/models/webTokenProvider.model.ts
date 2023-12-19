export interface IWebTokenProvider {
  create(userId: string): Promise<string>;
}
