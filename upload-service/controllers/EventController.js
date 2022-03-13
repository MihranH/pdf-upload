const db = require('../models');

class AuthController {
    static async handleEvent(req, res) {
        try {
            switch (req.body.type) {
                case 'SESSION_CREATED':
                    {
                        const { userId, token } = req.body;
                        await db.sessions.build({ userId, token }).save();
                    }
                    break;
                case 'LOGOUT':
                    {
                        const { token } = req.body;
                        await db.sessions.destroy({ where: { token } });
                    }
                    break;
                default:
                    break;
            }

            return res.send({ sessionAdded: true });
        }
        catch(err) {
            return res.status(500).send({message: 'Something went wrong'});
        }
       
    }
}

module.exports = AuthController;