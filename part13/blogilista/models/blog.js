const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db.js');

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    year: {
        type: DataTypes.INTEGER,
        defaultValue: new Date().getFullYear(),
        validate: {
            isInt: true,
            min: 1991,
            max: new Date().getFullYear()
        }
    },
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
})

module.exports = Blog