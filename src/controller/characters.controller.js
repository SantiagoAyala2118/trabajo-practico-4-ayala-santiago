import { Op } from "sequelize";
import Character from "../model/character.model.js";


//Validaciones
//------------------------------------------------------------------------------------>
export const createCharacter = async (req, res) => {
    try {
        const { name, ki, raze, gender, descripcion } = req.body;

        if (!name || !ki || !raze || !gender) {
            return res.status(400).json({
                status: 400,
                message: 'Todos los campos deben ser rellenados'
            });
        };

        if (name === '' || ki === '' || raze === '' || gender === '') {
            return res.status(400).json({
                status: 400,
                message: 'Todos los campos deben ser rellenados'
            })
        }

        if (name) {
            const existingCharacter = await Character.findOne({
                where: {
                    name
                }
            });
            if (existingCharacter) {
                return res.status(400).json({
                    status: 404,
                    message: 'Ya existe un personaje con ese nombre'
                });
            };
        };

        if (isNaN(ki) || !Number.isInteger(Number(ki))) {
            return res.status(400).json({
                status: 400,
                message: 'El nivel de poder (ki) debe ser un numero entero'
            });
        };

        if (gender != 'Male' && gender != 'Female') {
            return res.status(400).json({
                status: 400,
                message: 'Solo se aceptan valores como Male o Female en gender'
            });
        };

        if (descripcion != undefined && typeof descripcion !== 'string') {
            return res.status(400).json({
                status: 400,
                message: 'Si incluye descripción, debe ser una cadena de texto'
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
        res.status(201).json({
            message: 'Personaje creado correctamente',
            character
        });
    } catch (err) {
        console.error('Se ha producido un error en el servidor en la creación del personaje', err);
    };
};



//------------------------------------------------------------------------->
export const getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.findAll();
        res.status(302).json({ characters });

    } catch (err) {
        console.error('Se ha producido un error del servidor al traer todos los personajes', err);
    };
};


//------------------------------------------------------------------------------------->
export const getOneCharacter = async (req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (character) {
            res.status(302).json({ character });
        } else {
            return res.status(400).json({
                message: 'El personaje no existe dentro de la base de datos',
            });
        };
    } catch (err) {
        console.error('Se produjo un error del servidor al traer el personaje seleccionado', err);
    };
};






//-------------------------------------------------------------------------->
export const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, ki, raze, gender, descripcion } = req.body;

        //Ver si se encuentra el personaje con esa id
        const character = await Character.findByPk(id);

        if(name){
            //Ver existe algun otro personaje con el mismo nombre pero con diferente id
            const existingCharacter = await Character.findOne({
                where: {
                    name,
                    id: { [Op.ne]: id }
                }
            });
            //En caso de que justo lo anterior se cumpla, tira un error
            if (existingCharacter) {
                return res.status(404).json({
                    message: 'No pueden haber nombres repetidos, el nombre que quiere ingresar ya existe'
                });
            };
        }

        //Validaciones en caso de meter varios valores (Mismas validaciones que en createCharacter)
        if (name === '' || ki === '' || raze === '' || gender === '') {
            return res.status(400).json({
                status: 400,
                message: 'Todos los campos deben ser rellenados'
            })
        };
        if(ki){
            if (isNaN(ki) || !Number.isInteger(Number(ki))) {
                return res.status(400).json({
                    status: 400,
                    message: 'El nivel de poder (ki) debe ser un numero entero'
                });
            };
        };

        if(gender){
            if (gender != 'Male' && gender != 'Female') {
                return res.status(400).json({
                    status: 400,
                    message: 'Solo se aceptan valores como Male o Female en gender'
                });
            };
        };
        if(descripcion){
            if (descripcion != undefined && typeof descripcion !== 'string') {
                return res.status(400).json({
                    status: 400,
                    message: 'Si incluye descripción, debe ser una cadena de texto'
                });
            };
        }

        //El personaje existe, se metieron bien todos los valores y no hubo problemas
        //Vuelve a preguntar y procede a actualizar
        if (character) {
            await Character.update(req.body, {
                where: {
                    id
                }
            });
            //Nuevamente busca el personaje
            const characterUpdated = await Character.findByPk(id);
            //Se muestra el personaje
            res.status(201).json({
                message: 'Personaje actualizado',
                characterUpdated
            });
        } else {
            return res.status(404).json({
                message: 'El personaje seleccionado no fue encontrado en la base de datos'
            });
        };
    } catch (err) {
        console.error('Hubo un error del servidor al actualizar el personaje seleccionado', err);
    };
};


//--------------------------------------------------------------------------->
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
            return res.status(404).json({
                status: 404,
                message: 'El personaje que quiere eliminar no existe'
            });
        };
    } catch (err) {
        console.error('Hubo un error del servidor al querer borrar el personaje seleccionado', err);
    };
};
