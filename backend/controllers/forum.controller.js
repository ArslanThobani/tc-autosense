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


/**
   * returns a list with all available topics
   * @param {} req 
   * @param {*} res 
   */
exports.getTopics = async (req, res) => {
    try{ 
        let topics = await forumService.getTopics() 
        res.status(200).send(topics);
    }catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
  };

  /**
   * returns a list with all available brands
   * @param {} req 
   * @param {*} res 
   */
  exports.getBrands = async (req, res) => {
    try{ 
        let brands = await forumService.getBrands() 
        res.status(200).send(brands);
    }catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
  };

  /**
   * returns a list with all available modles for a given brand
   * @param {*} req 
   * @param {*} res 
   */
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

  /**
   * Total number of occurences in posts per topic
   * 
   * @param {*} req 
   * @param {*} res 
   */
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

  /**
   * Calculates the number of posts per quarter. Also predicts the next quarter
   * @param {*} req 
   * @param {*} res 
   */
  exports.getCountProblemsYear = async (req, res) => {
    try{ 
        let fps = await Forumpost.findAll({
            where: {
                brand: req.body.brand,
                model: req.body.model,
                topic: req.body.topic
            }
        });

        let data = [["Quater", "Occurences"]];

        let startYeat = 1980
        let date = new Date()
        let endyear = date.getFullYear()
        let endquater = parseInt(moment(date).quarter())
        for(let i=startYeat; i<=endyear; i++){
            for(let j=1; j<=10; j=j+3){
                let currentQuarter = (j+2)/3
                let dt = new Date(i, j-1, 1, 0, 0, 0)
                let from = moment(dt);
                let to = from.add(3, 'months').subtract(1, "seconds")
                from = dt
                to = to.toDate()
                let filteredPosts = fps.filter(val => {                     
                    return moment(val.postdate).isBetween(from, to)
                });

                let lastQ = false 
                let fact = 0
                if(i==endyear  && currentQuarter==endquater){
                    lastQ = true
                    let diff = moment(to).diff(moment(date), 'days')
                    fact = 91/(91-diff)
                }
                
                let amount = 0
                if(lastQ){
                    amount = parseInt(filteredPosts.length*fact)
                }else{
                    amount = filteredPosts.length;
                }
                if(amount == 0){
                    if(data.length > 1){
                        await data.push(["Q" + currentQuarter.toString() + " " + i.toString(), amount])
                    }                
                }else{
                    await data.push(["Q" + currentQuarter.toString() + " " + i.toString(), amount])
                }
                if(lastQ){break;}
            }
        }
        if(data.length>3){
            let lastThree = [];
            for(let i=data.length-3; i<data.length; i++){
                lastThree.push(data[i][1])
            }

            await axios.post(API_URL + "/predict", {occurances: lastThree} ,{withCredentials: true} )
            .then(response => {
                if (response.status == 200) {  
                    if(endquater != 4){
                        data.push(["Q" + (endquater+1).toString() + " " + endyear.toString(),  Math.floor(response.data.predictions)])
                    }else{                        
                        data.push(["Q" + (1).toString() + " " + (endyear+1).toString(),  Math.floor(response.data.predictions)])
                    }                    
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
