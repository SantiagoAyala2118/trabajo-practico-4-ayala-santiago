import { Router } from 'express';
import {
    createCharacter,
    getAllCharacters,
    getOneCharacter,
    updateCharacter,
    deleteCharacter
} from '../controller/characters.controller.js';

const router = Router();

app.post('/api/characters', createCharacter);
app.get('/api/characters', getAllCharacters);
app.get('/api/characters/:id', getOneCharacter);
app.put('/api/characters/:id', updateCharacter);
app.delete('/api/characters/:id', deleteCharacter);

export default router;