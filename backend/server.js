const express = require('express');
const app = express();    
const cors = require("cors");
const fileUpload  = require('express-fileupload');
const cookieParser = require('cookie-parser');
const generalConfig = require("./config/general.config");

var corsOptions = {
  origin: [generalConfig.clientURL, generalConfig.clientURLhttps, generalConfig.localClientURL],
  credentials: true
};
app.use(cookieParser());
app.use(fileUpload());
app.use(cors(corsOptions));
//app.options('*', cors(corsOptions));

var path = require('path');
global.appRoot = path.resolve(__dirname);
//app.use(express.static(path.join(__dirname, '/')));

app.use(express.json()); 
app.use(express.urlencoded());   
//app.use(express.bodyParser({limit: '50mb'})); 


const schema = "";     


require('./routes/forum.routes')(app);
 


///@@@@@@@@@@@@WICHTIG NICHT ENTFEREN, NUR ZUR SICHERHEIT AUSKOMMENTIERT
/** 
if(schema == "create-drop"){
  s3Service.clearBucket(s3, aws_config.s3.bucket_name)
  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
}; */
/** 
if(schema == "create"){
  db.sequelize.sync({alter: true}).then(() => {
    initial();
    console.log('Resync Db');
});
};
if(schema == "update"){
  db.sequelize.sync({alter: {drop: false}}).then(() => {
    //initial();
    console.log('Update Db');
});
};
*/


// set port, listen for requests
const PORT = 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


