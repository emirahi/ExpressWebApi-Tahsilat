const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', '123456789', {
    host: 'localhost',
    dialect: 'postgres'
});

class Debt extends Model {}

Debt.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Debt'
});

sequelize.sync({ force: false })
module.exports = Debt;