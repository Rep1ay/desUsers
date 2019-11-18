const express = require('express')
const router = express.Router()
const UsersData = require('../models/members')
const mongoose = require('mongoose')
const db = 'mongodb://antwerk:antwerk18@ds040309.mlab.com:40309/antwerkdb'

mongoose.set('useFindAndModify', false);
mongoose.connect(db,{useNewUrlParser:true})
    .then(() => {
        console.log('start api.js')
      })
      .catch((err) => {
        console.log('Error on start: ' + err);
    })

// Routers
router.get('/', (req, res) => {
    res.send('From API route')
})

router.get('/members', (req, res) => {
   
    UsersData.find({},(err, users_data) => {
            res.status(200).send(users_data)
             console.log('req.body: ', users_data);
        },
        (err) => {
            return res.res.status(500).send(err)
        }
    )   
})

router.put('/members', (req, res) => {
    
    let Id =  req.body.userId;
    let totalTime = req.body.totalTime;
    let userName = req.body.userName
    var query = { "userId": Id };
    let opts = {
        upsert: true,
        new: true
      };

    UsersData.findOneAndUpdate(query,
        { $set: {"userName": userName, 'totalTime' : totalTime} }, 
        opts,

     function(err, template){
        if(err){
            console.log("Something wrong when updating data!"+ '</br>' + err);
        }else{
            res.status(200).send(template)
            console.log('body: ', template);
        }
    });  
})

module.exports = router