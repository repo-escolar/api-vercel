import { pool } from "../db.js";

export const getAlumnos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM alumnos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM alumnos WHERE alumno_id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Alumno not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const deleteAlumnos = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM alumnos WHERE alumno_id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Alumno not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const createAlumno = async (req, res) => {
    try {
        const { nombre_alumno, edad, direccion, cedula, telefono, correo, estado, fecha_nac, fecha_registro } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO alumnos (nombre_alumno, edad, direccion, cedula, telefono, correo, estado, fecha_nac, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nombre_alumno, edad, direccion, cedula, telefono, correo, estado, fecha_nac, fecha_registro]
        );
        res.status(201).json({ id: rows.insertId, nombre_alumno, edad, direccion, cedula, telefono, correo, estado, fecha_nac, fecha_registro });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const updateAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_alumno, edad, direccion, cedula, telefono, correo, estado, fecha_nac, fecha_registro } = req.body;

        const [result] = await pool.query(
            "UPDATE alumnos SET nombre_alumno = IFNULL(?, nombre_alumno), edad = IFNULL(?, edad), direccion = IFNULL(?, direccion), cedula = IFNULL(?, cedula), telefono = IFNULL(?, telefono), correo = IFNULL(?, correo), estado = IFNULL(?, estado), fecha_nac = IFNULL(?, fecha_nac), fecha_registro = IFNULL(?, fecha_registro) WHERE alumno_id = ?",
            [nombre_alumno, edad, direccion, cedula, telefono, correo, estado, fecha_nac, fecha_registro, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Alumno not found" });

        const [rows] = await pool.query("SELECT * FROM alumnos WHERE alumno_id = ?", [
            id,
        ]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};
