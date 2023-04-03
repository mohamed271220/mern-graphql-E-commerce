import express, { Response, Request } from "expres";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", (_req: Request, res: Response) => {
  res.json("hello");
});

app.listen(3000, () => {
  console.log("server-runs");
});
