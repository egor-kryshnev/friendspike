var validator = require("validator");

exports.ValidateName = (req, res, next) => {
  let ReqName = req.body.name;
  if (
    validator.isDataURI(ReqName) == true ||
    validator.isMagnetURI(ReqName) == true
  ) {
    res.send({ message: "Access is denied!" });
  } else {
    next();
  }
};
