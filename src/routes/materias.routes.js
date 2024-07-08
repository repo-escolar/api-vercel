import { Router } from "express";
import {
  createMateria,
  deleteMaterias,
  getMateria,
  getMaterias,
  updateMateria,
} from "../controllers/materias.contoller.js";

const router = Router();

// GET all Materias
router.get("/materias", getMaterias);

// GET An Materias
router.get("/materias/:id", getMateria);

// DELETE An Materias
router.delete("/materias/:id", deleteMaterias);

// INSERT An Materias
router.post("/materias", createMateria);

router.patch("/materias/:id", updateMateria);

export default router;
