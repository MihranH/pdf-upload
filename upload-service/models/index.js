const Sequelize  = require('sequelize');
const config = require('../config');
const DATABASE_URL = process.env.DATABASE_URL || config.DATABASE_URL;
const sequelize = new Sequelize(DATABASE_URL);

const db = {};

let modules = [
    require('./userUploads.js'),
    require('./sessions.js'),
];

  // Initialize models
  modules.forEach((module) => {
    const model = module(sequelize, Sequelize);
    db[model.name] = model;
  });

  // Apply associations
  Object.keys(db).forEach((key) => {
    if ('associate' in db[key]) {
        db[key].associate(db);
    }
  });
  sequelize.sync();
    
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;