const db = require('../models');

class AuthMiddleware {
   static async checkAuth(req, res, next) {
        try {
            const token = req.headers.authorization;
            const session = await db.sessions.findOne({ where: {token} });
            if (!session) {
                return res.status(401).send({message: 'Unauthorized'});
            }

            req.session = session;
            next();
        } catch (error) {
            return res.status(500).send({message: 'Something went wrong'});
        }
   }
}

module.exports = AuthMiddleware;