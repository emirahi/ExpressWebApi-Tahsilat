const { Sequelize } = require('sequelize');
const User = require('../models/User');

const sequelize = new Sequelize('postgres', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres'
});

// Create a new user
async function createUser(username, password) {
  try {
    const newUser = await User.create({ username,  password });
    return { success: true, user: newUser.toJSON() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Read a user by Username
async function getUserByUsername(username) {
  try {
    const foundUser = await User.findOne({ where: { username} });
    if (foundUser) {
      return { success: true, user: foundUser.toJSON() };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Read a user by Username and Passwords
async function getUserByUsernameAndPassword(username,password) {
  try {
    const foundUser = await User.findOne({ where: { username, password} });
    if (foundUser) {
      return { success: true, user: foundUser.toJSON() };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Update a user by ID
async function updateUser(userId, newData) {
  try {
    const foundUser = await User.findByPk(userId);
    if (foundUser) {
      await foundUser.update(newData);
      return { success: true, user: foundUser.toJSON() };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Delete a user by ID
async function deleteUser(userId) {
  try {
    const foundUser = await User.findByPk(userId);
    if (foundUser) {
      await foundUser.destroy();
      return { success: true, message: 'User deleted' };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  getUserByUsernameAndPassword
};
