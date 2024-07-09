import express from "express";
import morgan from "morgan";

import employeesRoutes from "./routes/employees.routes.js";
import alumnosRoutes from "./routes/alumnos.routes.js";
import indexRoutes from "./routes/index.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import cors from 'cors'; // Importar cors usando ES Modules

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplazar con el origen de la aplicación
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Usar cors con las opciones configuradas

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);
app.use("/api", alumnosRoutes);
app.use("/api", materiasRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
