import type { NextApiRequest, NextApiResponse } from 'next';
import { GetUser, CreateUser, LoginUser, updateUser, deleteUsuario } from "../../services/DataBaseService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const users = await GetUser();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
      }
      break;

    case 'POST':
      if (req.body.action === 'create') {
        const { username, email, password, FirstName, LastName } = req.body;
        try {
          const result = await CreateUser(username, email, password, FirstName, LastName);
          res.status(201).json({ message: 'Usuario creado exitosamente', result });
        } catch (error) {
          res.status(500).json({ message: 'Error al crear el usuario', error });
        }
      }
      else if (req.body.action === 'login') {
        const { username, password } = req.body;
        try {
          const isValid = await LoginUser(username, password);
          if (isValid) {
            res.status(200).json({ message: 'Login exitoso' });
          } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error al validar el usuario', error });
        }
      }
      break;

    case 'PUT':
      const { id, username, email, password, FirstName, LastName } = req.body;
      try {
        const result = await updateUser(id, username, email, password, FirstName, LastName);
        res.status(200).json({ message: 'Usuario actualizado exitosamente', result });
      } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
      }
      break;

    case 'DELETE':
      const { userId } = req.body;
      try {
        const result = await deleteUsuario(userId);
        res.status(200).json({ message: 'Usuario eliminado exitosamente', result });
      } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
      }
      break;

    default:
      res.status(405).json({ message: 'Método no permitido' });
      break;
  }
}
