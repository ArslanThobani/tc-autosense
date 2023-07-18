module.exports = (sequelize, Sequelize) => {
    const Forumcomment = sequelize.define("forumcomment", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },      
      postid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },      
      comment: {
        type: Sequelize.STRING(2000),
        allowNull: false
      },
      timestamps: false,
      createdAt: false,
      updatedAt: false
    }, 
    {
      timestamps: false,
    });    
    return Forumcomment;
  };