import express from "express";

const app = express();
const PORT = 8000;

import appRoutes from "./routes/app.route.js";

function main() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(appRoutes);
  // Server is running here
  app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
