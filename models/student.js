const {sequelize, DataTypes} = require('sequelize');
const db = require('../utils/db');

const Student = db.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { 
            isEmail: true
        }
    },  
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'students',
    timestamps: false
}); 
module.exports = Student;
