import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

async function main() {
  await connectDb();
  const app = createApp();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Fatal startup error:", err);
  process.exit(1);
});
