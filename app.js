import express from 'express';
import dotenv from 'dotenv';
import initDB from './src/config/db.js';
import charactersRoutes from './src/routes/characters.routes.js';
dotenv.config();
initDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


//Rutas
app.use('/', charactersRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});