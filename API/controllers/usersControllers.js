const User = require("../models/Users");

//For new users
exports.newUser = async (req, res, next) => {
  //create object of user with req.body data
  const user = new User(req.body);

  try {
    await user.save();
    res.json({ message: "The user was created" });
  } catch (error) {
    console.log(error);
    next();
  }
};

//get users data
exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    next();
  }
};

//get users data by id
exports.getUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    next();
  }
};

//update users data by id
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    next();
  }
};

//delete user by id
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "User was deleted" });
  } catch (error) {
    console.log(error);
    next();
  }
};
