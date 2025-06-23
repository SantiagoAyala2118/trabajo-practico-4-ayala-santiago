import express from 'express';
import dotenv from 'dotenv';
import initDB from './src/config/db.js';
import router from './src/routes/characters.routes.js';
dotenv.config();
initDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


//Rutas
app.use('/', createCharacter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});