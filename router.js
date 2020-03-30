var bodyParser = require("body-parser");
var groupValidator = require("./validations/SecurityValidator");
var InputValidator = require("./validations/InputValidator");
var groupController = require("./controllers/groupController");
var userController = require("./controllers/userController");
var userValidator = require("./validations/UserValidator");
const spikeGetToken = require('./spikeKartoffel');


module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/api/getToken", async (req, res) => {
    const token = await spikeGetToken();
    console.log(token);
    res.send(token);
  });
  
  // /api/createGroup
  app.post("/api/groups/create", (req, res) => {
      groupController.CreateGroup(req, res);
  });
  // /api/groups/

  // /api/getAllGroups
  app.get("/api/groups", (req, res) => {
    groupController.GetAllGroups(req, res);
  });
  // /api/groups/

  // /api/allGroups/getGroupsByPerson/:namePerson
  app.get("/api/groups/personId/:namePerson", (req, res) => {
    groupController.GetGroupsByPerson(req, res);
  });
  // /api/groups?userName=123

  // /api/allGroups/getGroupsByPersonAdmin/:id
  app.get("/api/groups/personId/:id/admin", (req, res) => {
    groupController.GetGroupsByPersonAdmin(req, res);
  });
  // /api/groups?userId=123&admin=true
  
  // /api/allGroups/getGroupsByPersonNotAdmin/:id
  app.get("/api/groups/personId/:id/noAdmin", (req, res) => {
    groupController.GetGroupsByPersonNotAdmin(req, res);
  });
  // /api/groups?userId=123&admin=false

  // /api/getOneGroupById/:id
  app.get("/api/groups/id/:id", (req, res) => {
      groupController.GetOneById(req, res);
    }
  );
  // /api/groups/:id

  // /api/getOneGroupByName/:name
  app.get("/api/groups/name/:name",(req, res) => {
      groupController.GetOneByName(req, res);
    }
  );
  // /api/groups?groupName=123
 
  // app.get("/api/groups/type/:userId/:typeGroup" , (req, res) => {
  //     groupController.GetGroupByTypeAndUserId(req, res); 
  //   }
  // );

  app.get("/api/groups/byuser/:userId", (req, res) => {
      groupController.GetGroupsByPersonId(req, res);
    }
  );
  // /api/groups?userId=123

  // /api/getAllGroupBySymbols/:name
  app.get('/api/groups/symbols/:name', (req, res) => { //Retunrns group detail by chars
    groupController.GetAllBySymbols(req, res);
  });
  // /api/groups?groupsNameSearch=al

  // /api/getAllGroupMembersByID/:id
  app.get('/api/groups/members/:id', (req, res) => {
    groupController.GetAllMembers(req, res);
  });
  // /api/groups/members/:id

  // /api/updateGroup
  app.put("/api/groups/update",(req, res) => {
      groupController.Update(req, res);
    }
  );
  // /api/groups/:id
  
  // /api/deleteGroup
  app.delete("/api/groups/delete", (req, res) => { 
    groupController.Delete(req, res);
  });
  // /api/groups/:id

  app.post("/api/sendEmail", (req, res) => {
    groupController.SendMail(req, res);
  });

  //* User Router *\\

  app.post(
    "/api/createUser",
    (req, res) => {
      // userController.CreateUsersloop(req, res);
      userController.CreateUser(req, res);
    }
  );
  // /api/users

  app.get("/api/getuserByName/:name", (req, res) => {
  userController.getUserByName(req,res)
  });
  // /api/users?userName=asd

  app.get("/api/getAllUsers/", (req, res) => {
    userController.GetAllUsers(req, res);
  });
  // /api/users

  app.post('/api/checkUser', (req, res) => {
    userController.CheckUser(req, res);
  })
  // /api/users/check

  app.put('/api/updateUser', (req, res) => {
    userController.UpdateUser(req, res);
  });
  // /api/users
};
