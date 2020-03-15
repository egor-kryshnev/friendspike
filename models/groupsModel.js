var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  people: [
    {
      _id: false,
      user: { type: Schema.Types.ObjectId, ref: "users" },
      admin: Boolean
    }
  ],
  imgPath: String,
  description: String
});
GroupSchema.set("versionKey", false);
var Groups = mongoose.model("Groups", GroupSchema, "groups");
module.exports = Groups;
