import { pool } from "../db.js";

export const getMaterias= async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM materias");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM materias WHERE materia_id = ?", [
            id,
        ]);

        if (rows.length <= 0) {
            return res.status(404).json({ message: "Materia not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const deleteMaterias = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM materias WHERE materia_id = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Materia not found" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const createMateria = async (req, res) => {
    try {
        const { nombre_materia, estado, fecha_registro } = req.body;
        const [rows] = await pool.query(
            "INSERT INTO materias (nombre_materia, estado, fecha_registro) VALUES (?, ?, ?)",
            [ nombre_materia, estado, fecha_registro]
        );
        res.status(201).json({ id: rows.insertId, nombre_materia, estado, fecha_registro });
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const updateMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_materia, estado, fecha_registro } = req.body;

        const [result] = await pool.query(
            "UPDATE materias SET nombre_materia = IFNULL(?, nombre_materia), estado = IFNULL(?, estado), fecha_registro = IFNULL(?, fecha_registro) WHERE materia_id = ?",
            [nombre_materia, estado, fecha_registro, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Materia not found" });

        const [rows] = await pool.query("SELECT * FROM materias WHERE materia_id = ?", [
            id,
        ]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};
