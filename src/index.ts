import express from "express";
import { routes } from "./shared/routes";

const app = express();

app.use(express.json());
app.use(routes);

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
