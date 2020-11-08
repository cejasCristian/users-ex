const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const credentialsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//method to encrypt the password
credentialsSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //'10' number of rounds to execute the algorithm, more number of rounds, more security; but more demanding on server
  return await bcrypt.hash(password, salt); //.hash generate encrypt
};

//method to compare the encrypted pass with the pass of the database (also encrypted) return true or false
credentialsSchema.methods.validatePassword = async function (password) {
  //use function to access the password of the object with this.
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Credentials", credentialsSchema);
