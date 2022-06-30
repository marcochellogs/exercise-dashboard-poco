const db = require('../models/index.js');

const userMethods = {
  checkOwnership: (payload) => {
    return payload.repository.name.includes(payload.sender.login)
  },
  saveUserData: async ({ username, temp_password }) => {
    try {
      const [user] = await db.User.findOrCreate({
        where: { username },
        defaults: {
          password: temp_password,
          signUpDate: new Date().toISOString()
        }
      });
      return user;
    } catch (error) {
      console.log('')
      console.log('saveUserData error ', error.parent)
    }
  },
  getAllUsers: async () => {
    return await db.User.findAll()
  },
  getUserByUsername: async (username) => {
    return await db.User.findAll({ where: { username } })
  }
}

module.exports = userMethods
