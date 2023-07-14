const controller = require("../controllers/forum.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/test",
        controller.test
    );

    app.post(
        "/api/getTopics",
        controller.getTopics
    );

    app.post(
        "/api/getBrands",
        controller.getBrands
    );

    app.post(
        "/api/getModels",
        controller.getModels
    );

    app.post( 
        "/api/getCountProblems",
        controller.getCountProblems
    );

    
    app.post( 
        "/api/getCountProblemsYear",
        controller.getCountProblemsYear
    );
    


}