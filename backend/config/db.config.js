module.exports = {
  HOST: "autosense-1.ciqghxikd2ck.us-east-1.rds.amazonaws.com",//"192.168.178.66",
  USER: "postgres",
  PASSWORD: "AutoSense123?",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }  
};