const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost:3306',        
    user: 'root',          
    password: '1234',   
    database: 'Pruena'    
});

db.connect((err: any) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});


app.post('/agregar-dato', (req: { body: { nombre: any; email: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    const { nombre, email } = req.body;

   
    const query = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
    db.query(query, [nombre, email], (err: any, result: any) => {
        if (err) {
            console.error('Error al insertar los datos: ', err);
            return res.status(500).send('Error al insertar los datos');
        }
        res.status(200).send('Datos ingresados correctamente');
    });
});


app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
