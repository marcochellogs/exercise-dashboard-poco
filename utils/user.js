const db = require('../models/index.js');

const userMethods = {
  checkOwnership: (payload) => {
    return payload.repository.name.includes(payload.sender.login)
  },
  saveUserData: async (payload) => {
    try {
      const [user] = await db.User.findOrCreate({
        where: { username: payload.sender.login },
        defaults: {
          password: payload.sender.login,
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
    return await db.User.findOne({ where: { username } })
  }
}

module.exports = userMethods
