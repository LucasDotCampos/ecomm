import pgp from "pg-promise";

export default class Connection {
  connection: any;

  constructor() {
    this.connection = pgp()(`${process.env.DATABASE_URL}`);
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  close(): Promise<void> {
    return this.connection.$pool.end();
  }
}
