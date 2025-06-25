import Character from "../model/character.model.js";


//Validaciones
export const createCharacter = async (req, res) => {
    try {
        const { name, ki, raze, gender, descripcion } = req.body;

        if (!name || !ki || !raze || !gender) {
            res.status(400).json({
                status: 400,
                message: 'Todos los campos deben ser rellenados'
            });
        };

        if (name === '' || ki === '' || raze === '' || gender === '') {
            res.status(400).json({
                status: 400,
                message: 'Todos los campos deben ser rellenados'
            })
        }

        if (ki === NaN) {
            console.log('El nivel de poder (ki) debe ser un numero entero')
            res.status(400).json({
                status: 400,
                message: 'El nivel de poder (ki) debe ser un numero entero'
            });
        };

        if (gender != 'Male' && gender != 'Female') {
            console.log('Solo se aceptan valores como "Male" o "Female"');
            res.status(400).json({
                status: 400,
                message: 'Solo se aceptan valores como "Male" o "Female"'
            });
        };

        if (descripcion !== undefined && typeof descripcion !== 'string') {
            res.status(400).json({
                status: 400,
                message: 'Si incluyes descripción, debe ser una cadena de texto.'
            });
        };



        //Pasó todas las validaciones
        const character = await Character.create({
            name,
            ki,
            raze,
            gender,
            descripcion
        });
        res.status(201).json({ character });
    } catch (err) {
        console.error('Se ha producido un error en el servidor en la creación del personaje', err);
    };
};

export const getAllCharacters = async (req, res) => {
    try {
        const character = await Character.findAll();
        res.status(302).json({ character });

    } catch (err) {
        console.error('Se ha producido un error del servidor al traer todos los personajes', err);
    };
};

export const getOneCharacter = async (req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (character) {
            res.status(302).json({ character });
        } else {
            res.status(400).json({
                message: 'El personaje no existe dentro de la base de datos',
            });
        };
    } catch (err) {
        console.error('Se produjo un error del servidor al traer el personaje seleccionado', err);
    };
};

export const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByPk(id);
        if (character) {
            await Character.update(req.body, {
                where: {
                    id
                }
            });
            const characterUpdated = await Character.findByPk(id);

            res.status(201).json({ 
            message: 'Personaje actualizado',
            characterUpdated });
        } else {
            res.status(404).json({
                message: 'El personaje seleccionado no fue encontrado en la base de datos'
            });
        };
    } catch (err) {
        console.error('Hubo un error del servidor al actualizar el personaje seleccionado', err);
    };
};

export const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findByPk(id);

        if (character) {
            await Character.destroy({
                where: {
                    id
                }
            });
            res.status(410).json({
                message: 'Personaje eliminado'
            });

        } else {
            res.status(404).json({
                status: 404,
                message: 'El personaje que quiere eliminar no existe'
            });
        };
    } catch (err) {
        console.error('Hubo un error del servidor al querer borrar el personaje seleccionado', err);
    }
}
