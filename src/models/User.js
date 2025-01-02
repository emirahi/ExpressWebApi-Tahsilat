const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123456789@localhost:5432/postgres');

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});

sequelize.sync({ force: false })

module.exports = User;
