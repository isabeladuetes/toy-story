import express from "express";
import {
  getAllToyStorys,
  getToyStoryById,
  createToyStory,
  deleteToyStory,
  updateToyStory,
} from "./../controllers/personagensController.js";

const router = express.Router();

// Rotas
router.get("/", getAllToyStorys);
router.get("/:id", getToyStoryById);
router.post("/", createToyStory);
router.delete("/:id", deleteToyStory);
router.put("/:id", updateToyStory);

export default router;
