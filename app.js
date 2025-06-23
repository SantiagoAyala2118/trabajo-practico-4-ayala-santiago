import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
initDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/', (req,res) => {
    res.status(200).json({
        message : 'Hola Mundo'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});