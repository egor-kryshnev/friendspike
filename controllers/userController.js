const Users = require("../models/userModel");
const axios = require('axios');
const spikeGetToken = require('../spikeKartoffel');
var exports = module.exports;


exports.CreateUser = function(req, res) {
  var user = new Users(req.body);
  user.save(err => {
    if (err) throw err;
  });
  res.status(200).json({ message: "User created!" });
};

exports.GetAllUsers = function(req, res) {
  Users.find({}, (err, Users) => {
    if (err) throw err;
    res.status(200).send(Users);
  });
};

exports.CheckUser = async function(req, res) {
  Users.findOne({ _id: req.body._id }, async (err, user) => {
    console.log("useruser", user);
    if (err) throw err;
    if (user === null || user.length == 0) {
      const token =  await spikeGetToken();
      console.log(token);
      const resAx = axios.get(
        //'' , {
        'http://kartoffel-master.eastus.cloudapp.azure.com:3001/api/persons/search' + req.body._id , {
          headers: {
            // Authorization: process.env.TOKEN
            Authorization: token
          }
        },
      ).then((data) => {
        console.log("checkUser", data.data);
        var result = {
          _id: data.data._id,
          fullName: data.data.fullName,
          personalNumber: data.data.personalNumber,
          hierarchy: data.data.hierarchy,
          secondaryDomainUsers: data.data.domainUsers,
          mail: data.data.mail,
          avatarPath: req.body.avatarPath,
          background: req.body.background
        };
        var userRes = new Users(result);
        userRes.save(err => {
          if (err) throw err;
        });
        res.status(200).json({ message: "User created!" });
      });
    } else {
      res.status(200).send(user);
    }
  });

};

exports.UpdateUser = function(req, res) {
  var user = new Users(req.body);
  console.log("UPDATE", user);
  Users.updateOne({ _id: req.body._id }, user, function(err, User) {
    if (err) return res.send(err);
    res.status(200).send({ message: "User Updated!" });
  });
};

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

console.log(makeid(5));

exports.CreateUsersloop = function(req, res) {
  for(let i = 0; i < 50000; i++){
        
    var newUser1 = {
        fullName: makeid(5),
        personalNumber: "8495179",
        hierarchy: ["s/s//ss/s/"],
        primaryDomainUser: 
        {
        adfsUID: `${i}`,
        uniqueID: `${i}`
        },
        secondaryDomainUsers: 
        [
        {
        adfsUID: `${i}`,
        uniqueID: `${i}`
        }
        ],
        mail: "ronabet1@gmail.com",
        avatarPath: 'assets/img/guest.png'
    }
    var newUser = new Users(newUser1);
    newUser.save(err => {
        if (err) throw err;
        console.log("Saved to DB");
    });
}
  res.status(200).json({ message: "User created!" });
};

// exports.getUserByName = function(req, res) {
//   Users.find({ "fullName": { "$regex": `${req.params.name}`, "$options": "i" } },
//     function(err,docs) { 
//       console.log(docs);
//       res.status(200).send(docs);
//     } 
//     );
// }

exports.getUserByName = async function(req, res) {
  console.log(req.params.name); 
  const token =  await spikeGetToken();
  const resAx = axios.get(
    // '' , {
    'http://kartoffel-master.eastus.cloudapp.azure.com:3001/api/persons/search' , {
      headers: {
        // Authorization: process.env.TOKEN
        Authorization: token
      },
      params: {
        fullname: req.params.name
      }
    },
  ).then((data) => {
    console.log(data.data);
    var result = [];
    for(var i = 0; i < data.data.length; i++){
      if(i == 0) {
        result = [{
          _id: data.data[i].id,
          fullName: data.data[i].fullName,
          personalNumber: data.data[i].personalNumber,
          hierarchy: data.data[i].hierarchy,
          secondaryDomainUsers: data.data[i].domainUsers,
          mail: data.data[i].mail
        }]
      } else {
        result.push({
          _id: data.data[i].id,
          fullName: data.data[i].fullName,
          personalNumber: data.data[i].personalNumber,
          hierarchy: data.data[i].hierarchy,
          secondaryDomainUsers: data.data[i].domainUsers,
          mail: data.data[i].mail
        })
      }
    }
    console.log(result);  
    res.status(200).send(result);
  });
} 

