import { Router } from "express";
import {
  createAlumno,
  deleteAlumnos,
  getAlumno,
  getAlumnos,
  updateAlumno,
} from "../controllers/alumnos.controller.js";

const router = Router();

// GET all Alumnos
router.get("/alumnos", getAlumnos);

// GET An Alumno
router.get("/alumnos/:id", getAlumno);

// DELETE An Alumno
router.delete("/alumnos/:id", deleteAlumnos);

// INSERT An Alumno
router.post("/alumnos", createAlumno);

router.patch("/alumnos/:id", updateAlumno);

export default router;
