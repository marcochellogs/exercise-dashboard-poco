const authMethods = {
  verifySecret: async (req, payload) => {
    const authHeader = req.headers['x-pic'];
    const salt = process.env.WEBHOOK_SALT;

    if (payload && authHeader && salt) {
      try {
        const saltedSha256 = require('salted-sha256');
        const hash = await saltedSha256(payload, salt, true);
        if (hash && hash !== '' && hash === authHeader.toLowerCase()) {
          return true;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}

module.exports = authMethods

