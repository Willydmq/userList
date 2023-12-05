import { db } from "../db.js";

export const getUsers = async (_, res) => {
  const connection = await db;
  const q = "SELECT * FROM usuarios";

  connection.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = async (req, res) => {
  const connection = await db;
  const q = "INSERT INTO usuarios(`user`, `email`, `password`) VALUES(?,?,?)";

  const values = [req.body.user, req.body.email, req.body.password];

  connection.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario creado con exito");
  });
};

export const updateUser = async (req, res) => {
  const connection = await db;
  const q =
    "UPDATE usuarios SET `user` = ?, `email` = ?, `password` = ? WHERE `id` = ?";

  const values = [req.body.user, req.body.email, req.body.password];

  connection.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario Actualizado con Exito");
  });
};

export const deleteUser = async (req, res) => {
  const connection = await db;
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  connection.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario Eliminado con Exito");
  });
};
