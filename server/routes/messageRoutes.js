import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getMessages,
  getUser,
  markAsRead,
  sendMessage,
} from "../controllers/messageController.js";

const msgRouter = express.Router();

msgRouter.get("/users", protectRoute, getUser);
msgRouter.get("/:id", protectRoute, getMessages);
msgRouter.put("/mark/:id", protectRoute, markAsRead);
msgRouter.post("/send/:id", protectRoute, sendMessage);

export default msgRouter;
