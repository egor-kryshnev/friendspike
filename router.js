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

  // /api/getAllGroups
  app.get("/api/groups", (req, res) => {
    groupController.GetAllGroups(req, res);
  });

  // /api/allGroups/getGroupsByPerson/:namePerson
  app.get("/api/groups/personId/:namePerson", (req, res) => {
    groupController.GetGroupsByPerson(req, res);
  });

  // /api/allGroups/getGroupsByPersonAdmin/:id
  app.get("/api/groups/personId/:id/admin", (req, res) => {
    groupController.GetGroupsByPersonAdmin(req, res);
  });
  
  // /api/allGroups/getGroupsByPersonNotAdmin/:id
  app.get("/api/groups/personId/:id/noAdmin", (req, res) => {
    groupController.GetGroupsByPersonNotAdmin(req, res);
  });

  // /api/getOneGroupById/:id
  app.get("/api/groups/id/:id", (req, res) => {
      groupController.GetOneById(req, res);
    }
  );

  // /api/getOneGroupByName/:name
  app.get("/api/groups/name/:name",(req, res) => {
      groupController.GetOneByName(req, res);
    }
  );
 
  // app.get("/api/groups/type/:userId/:typeGroup" , (req, res) => {
  //     groupController.GetGroupByTypeAndUserId(req, res); 
  //   }
  // );

  app.get("/api/groups/byuser/:userId", (req, res) => {
      groupController.GetGroupsByPersonId(req, res);
    }
  );

  // /api/getAllGroupBySymbols/:name
  app.get('/api/groups/symbols/:name', (req, res) => { //Retunrns group detail by chars
    groupController.GetAllBySymbols(req, res);
  });

  // /api/getAllGroupMembersByID/:id
  app.get('/api/groups/members/:id', (req, res) => {
    groupController.GetAllMembers(req, res);
  });

  // /api/updateGroup
  app.put("/api/groups/update",(req, res) => {
      groupController.Update(req, res);
    }
  );
  
  // /api/deleteGroup
  app.delete("/api/groups/delete", (req, res) => { 
    groupController.Delete(req, res);
  });

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

  app.get("/api/getuserByName/:name", (req, res) => {
  userController.getUserByName(req,res)
  });

  app.get("/api/getAllUsers/", (req, res) => {
    userController.GetAllUsers(req, res);
  });

  app.post('/api/checkUser', (req, res) => {
    userController.CheckUser(req, res);
  })

  app.put('/api/updateUser', (req, res) => {
    userController.UpdateUser(req, res);
  });
};
