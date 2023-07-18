const db = require("../models");
const sequelize = db.sequelize;

exports.getTopics = async () => {  

    let fps = await db.forumpost.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('topic')), 'DISTINCT']]
    });
    fps = fps.map( i =>  i.dataValues.DISTINCT)
    fps.pop("no match")
    return fps
};

exports.getBrands = async () => {  

    let fps = await db.forumpost.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('brand')), 'DISTINCT']]
    });

    fps = fps.map( i =>  i.dataValues.DISTINCT)

    return fps
};