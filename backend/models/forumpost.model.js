module.exports = (sequelize, Sequelize) => {
    const Forumpost = sequelize.define("forumpost", {
      postid: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },      
      username: {
        type: Sequelize.STRING(50),
        allowNull: false
      },       
      model: {
        type: Sequelize.STRING(50),
        allowNull: false
      },         
      postdate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },  
      post: {
        type: Sequelize.STRING(5000),
        allowNull: false
      },     
      brand: {
        type: Sequelize.STRING(100),
        allowNull: false
      },     
      topic: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    }, 
    {
      timestamps: false,
    });  
    return Forumpost;
  };