const db = require('../models/index.js');

const userMethods = {
  saveUserData: async ({ username, temp_password }) => {
    try {
      const [user] = await db.User.findOrCreate({
        where: { username },
        defaults: {
          password: temp_password,
          signUpDate: new Date().toISOString()
        }
      });
      console.log('user.username ', user.username)
      return user;
    } catch (error) {
      console.log('error 1 ', error.parent)
    }
  },
  getAllUsers: async () => {
    return await db.User.findAll()
  },
  getUserByUsername: async (username) => {
    return await db.User.findAll(username)
  }
}

module.exports = userMethods
