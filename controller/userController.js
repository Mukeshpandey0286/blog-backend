const User = require("../models/userModel");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

     // Check if a user with the given email or username already exists
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
            return res.status(401).json({ msg: 'User already exists' });
        }

    await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({ msg: "User created successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {

    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.status(200).json({ msg: "User signed in successfully!", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { signUp, signIn };
