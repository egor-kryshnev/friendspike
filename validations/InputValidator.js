const Groups = require("../models/groupsModel");
const Users = require("../models/userModel");
var validator = require("email-validator");

exports.ValidateInputTypes = (req, res, next) => {
  var name = req.body.name;
  var imgPath = req.body.imgPath;
  var description = req.body.description;
  var errCode = 0;
  var peopleArr = req.body.people;
  if (
    typeof name != "string" ||
    typeof description != "string" ||
    typeof imgPath != "string"
  ) {
    errCode = 1;
  }
  if (errCode) {
    res.status(400).send({
      error:
        "The properties are not by the types, name & number = string, admin = boolean"
    });
  } else {
    next();
  }
  return true;
};

exports.validateBodyHTMLTags = (req, res, next) => {
  var name = req.body.name;
  var imgPath = req.body.imgPath;
  var description = req.body.description;
  var HTMLTags = "/<>[]^";
  var ArrHTMLtags = HTMLTags.split("");
  var ArrName = name.split("");
  var ArrImg = imgPath.split("");
  var ArrDes = description.split("");
  var errCode = 0;

  for (let x = 0; x < ArrName.length; x++) {
    for (let y = 0; y < ArrHTMLtags.length; y++) {
      if (ArrName[x].includes(ArrHTMLtags[y])) {
        errCode = 1;
      }
    }
  }
  for (let x = 0; x < ArrImg.length; x++) {
    for (let y = 0; y < ArrHTMLtags.length; y++) {
      if (ArrImg[x].includes(ArrHTMLtags[y])) {
        errCode = 1;
      }
    }
  }
  for (let x = 0; x < ArrDes.length; x++) {
    for (let y = 0; y < ArrHTMLtags.length; y++) {
      if (ArrDes[x].includes(ArrHTMLtags[y])) {
        errCode = 1;
      }
    }
  }
  if (errCode) {
    res.status(400).send({ error: "HTML Tags, Access is denied!" });
    console.log("The user insert HTML Tags, Access is denied!");
  } else {
    next();
  }
};

exports.ValidateID = (req, res, next) => {
  const GroupID = req.params.id;
  Groups.countDocuments({ _id: GroupID }, function(err, countofDoc) {
    if (err || countofDoc < 1) {
      return res
        .status(404)
        .send({ message: "The ID not found, try other ID :(" });
    }
    next();
    return true;
  });
};

exports.ValidateIDByRegEx = (req, res, next) => {
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  const GroupID = req.params.id;
  if (checkForHexRegExp.test(GroupID) == false) {
    return res.status(404).send({ message: "The ID is not valid :(" });
  }
  next();
  return true;
};

exports.ValidateName = (req, res, next) => {
  var name = req.params.name;
  Users.countDocuments({ name: name }, (err, countofDoc) => {
    if (err || countofDoc < 1) {
      return res
        .status(404)
        .send({ message: "The name not found, try other name :(" });
    }
    next();
    return true;
  });
};

// exports.ValidateTypeParans

exports.ValidateUsersIDinDB = (req, res, next) => {
  var UsersIDArr = req.body.people;
  Users.countDocuments({ _id: UsersIDArr }, function(err, countofDoc) {
    if (countofDoc != UsersIDArr.length) {
      return res
        .status(404)
        .send({ message: "The ID's not found, try other ID :(" });
    } else {
      next();
    }
  });
};

exports.ValidateMail = (req, res, next) => {
  var groupId = req.body.groupId;
  Groups.findOne({ _id: groupId })
    .populate("people.user")
    .exec((err, group) => {
      var errCode = 0;
      const resArr = [];
      group.people.filter(people => {
        resArr.push(people.user.email);
      });
      for (let i = 0; i < resArr.length; i++) {
        if (!validator.validate(resArr[i])) {
          errCode = 1;
          // res.status(404).send({ message: "The Email address is not valid :(" });
        }
      }
      if (errCode) {
        res.send({ message: "The Email address is not valid :(" });
      }
      // } else {
      //   next();
      // }
      // if (!validator.validate(req.body.email)) {
      //   res.status(404).send({ message: "The Email address is not valid :(" });
      //  else {
      // next();
      // return true;
      // }
    });
};
