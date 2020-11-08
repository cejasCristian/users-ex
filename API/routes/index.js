const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const credentialsController = require("../controllers/credentialsControllers");

module.exports = function () {
  //add user data 'Post'
  router.post("/users", usersController.newUser);

  //get user data 'Get'
  router.get("/users", usersController.getUser);

  //get user data 'Get' by Id
  router.get("/users/:id", usersController.getUserId);

  //update users data
  router.put("/users/:id", usersController.updateUser);

  //delete users
  router.delete("/users/:id", usersController.deleteUser);

  //signup
  router.post("/signup", credentialsController.signUp);

  //login
  router.post("/login", credentialsController.logIn);

  //logout
  router.get("/logout", credentialsController.logOut);

  //user
  router.get("/me", credentialsController.me);

  return router;
};
