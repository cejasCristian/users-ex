const Credentials = require("../models/Credentials");
const jwt = require("jsonwebtoken");

//imports the token message
const config = require("../config");

exports.signUp = async (req, res, next) => {
  //create object of data for credentials with req.body data
  const credential = new Credentials(req.body);

  credential.password = await credential.encryptPassword(credential.password);

  try {
    await credential.save();
    const token = jwt.sign({ id: credential._id }, config.secret, {
      expiresIn: 3600 * 24, //token expires in one day (in seconds)
    });
    res.cookie("jwt", token);
    res.json({ message: "Created!", token });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.me = async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "no token provided",
    });
  }

  const decoded = jwt.verify(token, config.secret);
  const credential = await Credentials.findById(decoded.id, { password: 0 }); //dont return password

  if (!credential) {
    return res.status(404).send("not user found");
  }

  res.json(credential);
};

exports.logIn = async (req, res) => {
  const { email, password } = req.body;

  const credential = await Credentials.findOne({ email: email });
  if (!credential) {
    return res.status(404).send("The email doesn't exists");
  }

  const validPass = await credential.validatePassword(password);

  if (!validPass) {
    return res.status(401).json({ auth: false, token: null });
  }

  const token = jwt.sign({ id: credential._id }, config.secret, {
    expiresIn: 3600 * 24,
  });
  res.cookie("jwt", token);
  res.json({ auth: true, token });
};

exports.logOut = async (req, res) => {
  const options = {
    expiresIn: 10000,
  };
  res.cookie("jwt", "expiredtoken", options);
  res.status(200).json({ status: "success" });
};
