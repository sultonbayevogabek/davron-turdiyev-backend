import * as fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "../db/seats.json");

export const readSeats = async () => {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(data);
};

export const writeToSeat = async (sites) => {
  await fs.writeFile(DATA_PATH, JSON.stringify(sites, null, 2));
};
