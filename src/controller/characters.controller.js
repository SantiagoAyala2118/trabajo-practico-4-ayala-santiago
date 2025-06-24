import Character from "../model/character.model.js";
import charactersRoutes from "../routes/characters.routes.js";


//Validaciones
export const createCharacter = async (req,res)=> {
    try {
        const { name, ki, raze, gender } = req.body;

        if(!name || !ki || !raze || !gender){
            res.json({
                status: 400,
                message: 'Todos los campos deben ser rellenados'
            });
        };

        if(name==='' || ki==='' || raze==='' || gender===''){
            res.json({
                status: 400,
                message: 'Todos los campos deben ser rellenados'
            })
        }

        if(ki === NaN){
            console.log('El nivel de poder (ki) debe ser un numero entero')
            res.json({
                status: 400,
                message: 'El nivel de poder (ki) debe ser un numero entero'
            });
        };

        if(gender != 'Male' && gender != 'Female'){
            console.log('Solo se aceptan valores como "Male" o "Female"');
            res.json({
                status: 400,
                message: 'Solo se aceptan valores como "Male" o "Female"'
            });
        };



        const character = await Character.create({
            name,
            ki,
            raze,
            gender  
        });
        res.status(201).json({character});
    }catch (err){
        console.error('Se ha producido un error en la creación del personaje', err);
    };
};

export const getAllCharacters = async (req,res) => {
    try{
        const character = await Character.findAll();
        res.status(200).json({character});

    }catch (err){
        console.error('Se ha producido un error al traer todos los personajes', err);
    };
};

export const getOneCharacter = async (req, res) => {
    try{
        const character = await Character.findByPk(req.params.id);
        if(character){
            res.status(200).json({character});
        }else{
            res.status(400).json({
                message: 'El personaje no existe dentro de la base de datos',
            });
        };
    }catch (err){
        console.error('Se produjo un error al traer el personaje seleccionado', err);
    };
};

export const updateCharacter = async (req,res) => {
    try{
        const characterUpdated = await Character.update(req.params.id);
        if(characterUpdated){
            res.status(200).json({characterUpdated})
        }else{
            res.status(404).json({
                message: 'El personaje seleccionado no fue encontrado en la base de datos'
            });
        };
    }catch (err){
        console.error('Hubo un error al actualizar el personaje seleccionado', err);
    };
};
