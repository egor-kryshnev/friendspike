const { expect } = require("chai");
const { Server } = require("../server");
const request = require("supertest");

describe("router", function() {
  var server;
  before(function() {
    server = new Server();
  });

  describe("#GET /api/getOneGroupById/:id", function() {
    context("when Id group return all group details", function() {
      it("should return group details by ID", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getOneGroupById/5d46a9c76533f31bb00a961c")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });

  describe("#GET /api/getAllGroups", function() {
    context("when all groups returned", function() {
      it("should return groups details", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getAllGroups")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });

  describe("#GET /api/allGroups/getGroupsByPerson/:namePerson", function() {
    context("when all groups with person returned", function() {
      it("should return groups details", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/allGroups/getGroupsByPerson/Hagar Gur Arie")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  
  describe("#GET /api/getOneGroupByName/:name", function() {
    context("when group name return all group details", function() {
      it("should return groups details", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getOneGroupByName/AmanTube")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });
  
  describe("#GET /api/getAllGroupBySymbols/:name", function() {
    context("when group name synbols return all group details", function() {
      it("should return groups details", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getAllGroupBySymbols/mnt")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });

  describe("#GET /api/allGroups/getGroupsByPersonAdmin/:id", function() {
    context("when groups by admin returned", function() {
      it("should return admin groups", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/allGroups/getGroupsByPersonAdmin/5d4689e4c625210a80202ba7")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });

  describe("#GET /api/allGroups/getGroupsByPersonNotAdmin/:id", function() {
    context("when groups by not admin returned", function() {
      it("should return Not admin groups", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/allGroups/getGroupsByPersonNotAdmin/5d2594e36fcb691a0d178a71")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });

  describe("#GET /api/getAllGroupMembersByID/:id", function() {
    context("when Id group return all members of group ", function() {
      it("should return group members", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getAllGroupMembersByID/5d46a9c76533f31bb00a961c")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });

  context('#POST /api/createGroup', function () {
    it('Should return group created', function (done) {
      const ValidReq = { "name": "test", "people": [], "imgPath" : "assets/img/default2.png", "description" : "test"};
      request(server.app)
          .post('/api/createGroup')
          .send(ValidReq)
          .expect(200)
          .end((err, res) => {
            if (err) {
                return done(err);
            }
            return done();
          });
    });
  });

  context('#PUT /api/updateGroup', function () {
    it('Should return group created', function (done) {
      const ValidReq = { "_id": "5db16136c9120d06981f67a5", "name": "test", "people": [], "imgPath" : "assets/img/default5.png", "description" : "testUpdate"};
      request(server.app)
          .put('/api/updateGroup')
          .send(ValidReq)
          .expect(200)
          .end((err, res) => {
            if (err) {
                return done(err);
            }
            return done();
          });
    });
  });

  // context('#DELETE /api/deleteGroup', function () {
  //   it('Should return group deleted', function (done) {
  //     const ValidReq = { "_id": "5db16136c9120d06981f67a5"};
  //     request(server.app)
  //         .delete('/api/deleteGroup')
  //         .send(ValidReq)
  //         .expect(200)
  //         .end((err, res) => {
  //           if (err) {
  //               return done(err);
  //           }
  //           return done();
  //         });
  //   });
  // });

  
  context('#POST /api/sendEmail', function () {
    it('Should return email sent', function (done) {
      this.timeout(10000);
      // const ValidReq = { "groupId": "5d8a0a864fe5b7321011ca6b", "subject": "SubjectTest", "text": "testTest" };
      const resultJson = {
        groupId: "5d8a0a864fe5b7321011ca6b",
        subject: "SubjectTest",
        text: "testTest"
      }
      request(server.app)
          .post('/api/sendEmail')
          .send(resultJson)
          .expect(200)
          .end((err, res) => {
            if (err) {
                return done(err);
            }
            return done();
          });
    });
  });


  context('#POST /api/createUser', function () {
    it('Should return Saved to DB', function (done) {
      var newUser1 = {
        fullName: "TestTest",
        personalNumber: "8495179",
        hierarchy: ["s/s//ss/s/"],
        primaryDomainUser: 
        { 
        adfsUID:  "000001",
        uniqueID: "000001" 
        },
        secondaryDomainUsers: 
        [
        {
        adfsUID: "000001",
        uniqueID: "000001"
        }
        ],
        mail: "test@gmail.com",
        avatarPath: 'assets/img/guest.png'
    }
      request(server.app)
          .post('/api/createUser')
          .send(newUser1)
          .expect(200)
          .end((err, res) => {
            if (err) {
                return done(err);
            }
            return done();
          });
    });
  });

  describe("#GET /api/getuserByName/:name", function() {
    context("when name person return person details", function() {
      it("should return groups details", function(done) {
        this.timeout(10000);
        request(server.app)
          .get("/api/getuserByName/TestTest")
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });
    });
  });

  // describe("#GET /api/getAllUsers/", function() {
  //   context("when return all person", function() {
  //     it("should return groups details", function(done) {
  //       this.timeout(10000);
  //       request(server.app)
  //         .get("/api/getAllUsers/")
  //         .expect(200)
  //         .end((err, res) => {
  //           if (err) {
  //             done(err);
  //           }
  //           done();
  //         });
  //     });
  //   });
  // });

  context('#POST /api/checkUser', function () {
    it('Should return user detail if user created or user created if user created', function (done) {
      this.timeout(10000);
      // const ValidReq = { "groupId": "5d8a0a864fe5b7321011ca6b", "subject": "SubjectTest", "text": "testTest" };
      var newUser1 = {
        _id: "5db1832cce2d1e96acc71b9f",
        fullName: "TestTest23",
        personalNumber: "8495179",
        hierarchy: ["s/s//ss/s/"],
        primaryDomainUser: 
        {
        adfsUID: "000001",
        uniqueID: "000001"
        },
        secondaryDomainUsers: 
        [
        {
        adfsUID: "000001",
        uniqueID: "000001"
        }
        ],
        mail: "test@gmail.com",
        avatarPath: 'assets/img/guest.png'
    }
      request(server.app)
          .post('/api/checkUser')
          .send(newUser1)
          .expect(200)
          .end((err, res) => {
            if (err) {
                return done(err);
            }
            return done();
          });
    });
  });

  context('#POST /api/updateUser', function () {
    it('Should return user detail if user created or user created if user created', function (done) {
      this.timeout(10000);
      // const ValidReq = { "groupId": "5d8a0a864fe5b7321011ca6b", "subject": "SubjectTest", "text": "testTest" };
      var newUser1 = {
        _id: "5db1832cce2d1e96acc71b9f",
        fullName: "TestTest23Updated",
        personalNumber: "8495179",
        hierarchy: ["s/s//ss/s/"],
        primaryDomainUser: 
        {
        adfsUID: "000001",
        uniqueID: "000001"
        },
        secondaryDomainUsers: 
        [
        {
        adfsUID: "000001",
        uniqueID: "000001"
        }
        ],
        mail: "test@gmail.com",
        avatarPath: 'assets/img/guest.png'
    }
      request(server.app)
          .put('/api/updateUser')
          .send(newUser1)
          .expect(200)
          .end((err, res) => {
            if (err) {
                return done(err);
            }
            return done();
          });
    });
  });

});

