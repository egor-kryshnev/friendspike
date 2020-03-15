var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: false,
  _id: Schema.Types.ObjectId,
  fullName: String,
  personalNumber: String,
  hierarchy: [String],
  secondaryDomainUsers: 
  [
    {
    _id: false,
    adfsUID: String,
    uniqueID: String
    }
  ],
  mail: String,
  avatarPath: String,
  background: String
});

UserSchema.set("versionKey", false);
// UserSchema.set("autoIndex", false);
var Users = mongoose.model("users", UserSchema);
module.exports = Users;
