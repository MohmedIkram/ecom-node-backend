const Users = require("../model/user.model")
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      console.log(passwordHash);
  
      const user = new Users({
        name,
        password: passwordHash,
        email
      });
      console.log("USED DATA ");

      await user.save();
      console.log("USED DATA SAVED");
      // db to store it
      res.send(user);
    } catch (err) {
      res.status(500);
      res.send(err);
    }
};

// login route
const login = async (req, res, next) => {
  console.log("login entered");
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    const inDbStoredPassword = user.password;
    const isMatch = await bcrypt.compare(password, inDbStoredPassword);
    if (!isMatch) {
      res.status(500);
      res.send({ message: "Invalid credentials!!!" });
    } else {
      const token = jwt.sign({ id: user._id }, "secretkey");
      res.send({
        ...user.toObject(),
        token,
        message: "Successful login",
      });
    }
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};


module.exports = {
    signup: signup,
    login:login
};
