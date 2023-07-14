const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.forumcomment = require("./forumcomment.model.js")(sequelize, Sequelize);
db.forumpost = require("./forumpost.model.js")(sequelize, Sequelize);


db.forumpost.hasMany(db.forumcomment, {
  foreignKey: { 
    name: 'postid',
    allowNull: false
  }
});
db.forumcomment.belongsTo(db.forumpost, {
  foreignKey: { 
    name: 'postid',
    allowNull: false
  }
});

module.exports = db;