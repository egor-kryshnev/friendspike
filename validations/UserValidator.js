const Users = require("../models/userModel");

exports.ValidateInputTypes = (req, res, next) => {
  var name = req.body.name;
  var number = req.body.number;
  var errCode = 0;
  if (typeof name != "string" || typeof number != "string") {
    errCode = 1;
  }
  if (errCode) {
    res.status(400).send({
      error: "The properties are not by the types, name & number = string"
    });
  } else {
    next();
  }
  return true;
};

exports.validateBodyHTMLTags = (req, res, next) => {
  var name = req.body.name;
  var number = req.body.number;
  var ArrName = name.split("");
  var ArrNumber = number.split("");
  var HTMLTags = "/<>[]^";
  var ArrHTMLtags = HTMLTags.split("");
  var errCode = 0;

  for (let x = 0; x < ArrName.length; x++) {
    for (let y = 0; y < ArrHTMLtags.length; y++) {
      if (name.includes(ArrHTMLtags[y]) || number.includes(ArrHTMLtags[y])) {
        errCode = 1;
      }
    }
  }
  for (let x = 0; x < ArrNumber.length; x++) {
    for (let y = 0; y < ArrHTMLtags.length; y++) {
      if (
        ArrNumber.includes(ArrHTMLtags[y]) ||
        ArrNumber.includes(ArrHTMLtags[y])
      ) {
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

exports.ValidateIDByRegEx = (req, res, next) => {
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  const UserID = req.params.id;
  if (checkForHexRegExp.test(UserID) == false) {
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

exports.ValidateID = (req, res, next) => {
  const UserID = req.params.id;
  Users.countDocuments({ _id: UserID }, function(err, countofDoc) {
    if (err || countofDoc < 1) {
      return res
        .status(404)
        .send({ message: "The ID not found, try other ID :(" });
    }
    next();
    return true;
  });
};

// exports.ValidateIDinDB = (req, res, next) => {
//   const UserID = req.people;
//   Users.countDocuments({ _id: UserID }, function(err, countofDoc) {
//     if (err || countofDoc < 1) {
//       return res
//         .status(404)
//         .send({ message: "The ID not found, try other ID :(" });
//     }
//     next();
//     return true;
//   });
// };
