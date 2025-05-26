import { readSeats, writeToSeat } from "../helpers/file.helper.js";
import { v4 as uuidv4 } from "uuid";

const HOLD = "hold";
const FREE = "free";
const ON_HOLD = "on-hold";

// GET: Barcha sitlarni olish
export const getAllSeats = async (req, res) => {
  const sites = await readSeats();
  res.json(sites);
};

// export const getTicket = async (req, res) => {
//     const ticketId
// }

// POST: Sitni hold qilish yoki holdni bekor qilish
export const updateSeatStatus = async (req, res) => {
  const { status, name, holder } = req.body;
  const seats = await readSeats();

  if (!seats[name]) {
    return res.status(404).json({
      status: false,
      message: "Seat not found.",
    });
  }

  if (status !== HOLD && status !== ON_HOLD && status !== FREE) {
    return res.status(400).json({
      success: false,
      message: "Invalid status.",
    });
  }

  if (
    seats[name].holder &&
    status === ON_HOLD &&
    seats[name].holder !== holder
  ) {
    return res.status(400).json({
      success: false,
      message: "This seat is on-hold",
    });
  }

  if (seats[name].holder && status === HOLD && seats[name].holder !== holder) {
    return res.status(400).json({
      success: false,
      message: "This seat is already held",
    });
  }

  if (status !== HOLD && status !== ON_HOLD && status !== FREE) {
    return res.status(400).json({ error: "Invalid status." });
  }

  if (status === ON_HOLD) {
    sites[name].status = ON_HOLD;
    sites[name].holder = holder;
    sites[name].client = { name: "", phone: "", reservedAt: "" };
    if (!seats[name].ticketId) {
      seats[name].ticketId = uuidv4();
    }
  } else if (status === FREE) {
    sites[name].status = FREE;
    sites[name].holder = "";
    sites[name].client = { name: "", phone: "", reservedAt: "" };
    delete seats[name].ticketId;
  }

  await writeSites(sites);
  return res.status(200).json({
    success: true,
    message: "Seat status updated successfully",
  });
};

export const reserveSeat = async (req, res) => {
  const { name, client } = req.body;
  const seats = await readSeats();

  if (!seats[name]) {
    return res.status(404).json({
      success: false,
      message: "Seat not found.",
    });
  }

  if (seats[name].status !== ON_HOLD) {
    return res.status(400).json({
      success: false,
      message: "This seat is not on-hold.",
    });
  }

  if (seats[name].status === HOLD) {
    return res.status(400).json({
      success: false,
      message: "This seat is not on-hold.",
    });
  }

  seats[name].status = HOLD;
  seats[name].holder = client.name;
  seats[name].client = {
    name: client.name,
    phone: client.phone,
    reservedAt: new Date().toISOString(),
  };

  await writeToSeat(seats);
  return res.status(200).json({
    success: true,
    message: "Seat reserved successfully",
  });
};
