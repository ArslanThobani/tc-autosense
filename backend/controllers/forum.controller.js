const db = require("../models");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Forumcomment = db.forumcomment;
const Forumpost = db.forumpost;
const forumService = require("../services/forum.service");
const generalConfig = require("../config/general.config");
const axios = require("axios")
const moment = require('moment')
require('moment/locale/de')
var bcrypt = require("bcryptjs");

API_URL = generalConfig.apiURL

exports.test = async (req, res) => {
    const t = await sequelize.transaction();
    try{ 
        await t.commit(); 
        res.status(200).send({ test: "test"});
    }catch (err) {
        console.log(err);
        await t.rollback();
        res.status(500).send({ message: err.message });
  } 
};

exports.getTopics = async (req, res) => {
    try{ 
        let topics = await forumService.getTopics() 
        res.status(200).send(topics);
    }catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
  };

  exports.getBrands = async (req, res) => {
    try{ 
        let brands = await forumService.getBrands() 
        res.status(200).send(brands);
    }catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
  };

  exports.getModels = async (req, res) => {
    try{ 
        let fps = await db.forumpost.findAll({
            where: {
                brand: req.body.brand
            },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('model')), 'DISTINCT']]
        });
        fps = fps.map( i =>  {
            return i.dataValues.DISTINCT
        })
        res.status(200).send(fps);
    }catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
  };

  exports.getCountProblems = async (req, res) => {
    try{ 
        let fps = await Forumpost.findAll({
            where: {
                brand: req.body.brand,
                model: req.body.model
            }
        });

        let topics = await forumService.getTopics();
        let data = [["Topic", "Occurences"]];

        for(let i=0; i<topics.length; i++){
            
            let filteredPosts = fps.filter(val => {
                return val.topic == topics[i]
            });
            
            let amount = filteredPosts.length; 
            if(amount != 0){
                await data.push([topics[i], amount])
            }
        }

        console.log(data)

        res.status(200).send(data);
    }catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
  };

  
  exports.getCountProblemsYear = async (req, res) => {
    try{ 
        let fps = await Forumpost.findAll({
            where: {
                brand: req.body.brand,
                model: req.body.model,
                topic: req.body.topic
            }
        });

        let data = [["Year", "Occurences"]];

        let startYeat = 1980
        let date = new Date()
        let endyear = date.getFullYear()
        for(let i=startYeat; i<=endyear; i++){
            let from = new Date(i, 0, 1, 0, 0, 0)
            let to = new Date(i, 11, 31, 23, 59, 59)
            let filteredPosts = fps.filter(val => {
                return moment(val.postdate).isBetween(from, to)
            });
            
            let amount = filteredPosts.length; 
            if(amount == 0){
                if(data.length > 1){
                    await data.push([i.toString(), amount])
                }                
            }else{
                await data.push([i.toString(), amount])
            }
        }
        if(data.length>3){
            let lastThree = [];
            for(let i=data.length-3; i<data.length; i++){
                //console.log(data[i][1]) 
                lastThree.push(data[i][1])
            }

            console.log(lastThree)

            await axios.post(API_URL + "/predict", {occurances: lastThree} ,{withCredentials: true} )
            .then(response => {
                if (response.status == 200) {  
                    data.push([(endyear+1).toString(),  Math.floor(response.data.predictions)])
                    console.log(data) 
                }
                else{  
                    console.log(response);
                    throw Error("Something went wrong! The Following Error Occured: " + response);   
                } 
            })
            .catch(e=>{
                throw Error("Something went wrong! The Following Error Occured: " + e);
            });
        }
        
        res.status(200).send(data);
    }catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
  };
