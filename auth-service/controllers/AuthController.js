const db = require('../models');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { generateRandomString, fireEvent } = require('../util');
const { SESSION_EXPIRATION } = require('../config');


class AuthController {
    static async register(req, res) {
        try {
            const { name, surname, email, password } = req.body;
            const emailRegexp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

            if (!name || !surname || !email || !password) {
                return res.status(400).send({message: 'Invalid data'});
            } 

            if (!emailRegexp.test(email)) {
                return res.status(400).send({message: 'Invalid email'});
            } 

            if (password.length < 8) {
                return res.status(400).send({message: 'Invalid password, the length should be at least 8'});
            } 

            const checkExistingUser = await db.users.findOne({ where: { email } });
            if (checkExistingUser) {
                return res.status(400).send({message: 'User with this email already exists'});
            }

            const hashPassWord = await bcrypt.hash(password, 12);

            const user = await db.users.build({ name, surname, email, password: hashPassWord }).save();

            return res.send({ id: user.id });
        }
        catch(err) {
            return res.status(500).send({message: 'Something went wrong'});
        }
       
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({message: 'Invalid data'});
            } 

            const user = await db.users.findOne({ where: { email } });
            if (!user) {
                return res.status(400).send({message: 'Invalid email'});
            }

            const passwordIsCorrect = await bcrypt.compare(password, user.password)

            if (!passwordIsCorrect) {
                return res.status(400).send({message: 'Invalid password'});
            }

            const token = generateRandomString(10);
            const expireAt = moment().add(SESSION_EXPIRATION, 'days').format('YYYY-MM-DD hh:mm');
            await db.sessions.build({ userId: user.id, token, expireAt }).save();
            fireEvent({ type: 'SESSION_CREATED', userId: user.id, token });

            return res.send({ id: user.id, email: user.email, name: user.name, surname: user.surname, token });
        }
        catch(err) {
            return res.status(500).send({message: 'Something went wrong'});
        }
       
    }

    static async logout(req, res) {
        try {
            const token = req.headers.authorization;
            await db.sessions.destroy({ where: { token } });
            fireEvent({ type: 'LOGOUT', token });

            return res.send({ success: true });
        } catch (error) {
            return res.status(500).send({message: 'Something went wrong'});
        }
    }

    static async getMe(req, res) {
        try {
            const token = req.headers.authorization;

            const session = await db.sessions.findOne({ where: {token} });
            if (!session || moment().isSameOrAfter(session.expireAt)) {
                return res.status(401).send({message: 'Unauthorized'});
            }

            const user = await db.users.findOne({ where: {id: session.userId} });
            if (!user) {
                return res.status(401).send({message: 'Unauthorized'});
            }

            return res.send({ id: user.id, email: user.email, name: user.name, surname: user.surname });
        }
        catch(err) {
            return res.status(500).send({message: 'Something went wrong'});
        }
       
    }
}

module.exports = AuthController;