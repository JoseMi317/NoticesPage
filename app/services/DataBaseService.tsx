import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'Prueba', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const GetUser = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

export const CreateUser = async (username: string, email: string, password: string, FirstName: string, LastName: string) => {
  try {
    console.log('Datos de usuario a insertar:', username, email, password, FirstName, LastName);
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, FirstName, LastName) VALUES (?, ?, ?, ?, ?)',
      [username, email, password,FirstName,LastName]
    );
    return result;  
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
    throw error;
  }
};

export const LoginUser = async (username: string, password: string) => {
  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    return (rows as any[]).length > 0; 
  } catch (error) {
    console.error('Error al validar el usuario:', error);
    throw error;
  }
};

export const updateUser = async (id: number, username: string, email: string, password: string, FirstName: string, LastName: string) => {
  try {
    const [result] = await pool.query(
      'UPDATE users SET nombre = ?, email = ?, password = ?, FirstName = ?, LastName = ? WHERE id = ?',
      [username, email, password,FirstName, LastName, id]
    );
    return result;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const deleteUsuario = async (id: number) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};


export default pool;
