import { Router } from 'express';
import {
    createCharacter,
    getAllCharacters,
    getOneCharacter,
    updateCharacter,
    deleteCharacter
} from '../controller/characters.controller.js';

const charactersRoutes = Router();

charactersRoutes.post('/api/characters', createCharacter);
charactersRoutes.get('/api/characters', getAllCharacters);
charactersRoutes.get('/api/characters/:id', getOneCharacter);
charactersRoutes.put('/api/characters/:id', updateCharacter);
charactersRoutes.delete('/api/characters/:id', deleteCharacter);

export default charactersRoutes;