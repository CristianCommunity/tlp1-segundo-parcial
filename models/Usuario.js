const { sequelize, DataTypes } = require('../db');

const Usuario = sequelize.define('Usuario', {
    nombreusuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            messge: 'El email ya existe'
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    // Other model options go here
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'usuario'
});

// Crear tabla si no existe
Usuario.sync();

module.exports = Usuario;