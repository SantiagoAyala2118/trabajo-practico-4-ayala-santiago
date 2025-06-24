import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Character = sequelize.define('Character', {
    name :{ type: DataTypes.STRING(200), allowNull: false },
    ki: { type: DataTypes.INTEGER(), allowNull: false},
    raze: { type: DataTypes.STRING(150), allowNull: false, defaultValue: 'Human' },
    gender: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(1000) }
});
await Character.sync();

export default Character;