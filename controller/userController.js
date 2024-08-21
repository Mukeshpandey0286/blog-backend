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
         return res.status(401).json({ error: 'User already exists' });
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
    const user = await User.findOne({ email });
  if(!user) res.status(401).json({msg: "user is not found!!"})

    const token = await User.matchPasswordAndGenerateToken(user, password);

    return res.status(200).json({ msg: "User signed in successfully!", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getProfile = async(req, res) => {
try {
  const userId = req.user._id;

  // Fetch user profile from the database
  const user = await User.findById(userId).select("-password -salt"); // Exclude sensitive fields

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  // Send user profile in the response
  return res.status(200).json( user );
} catch (err) {
  console.error(err);
  res.status(500).json({ msg: "Internal Server Error" });
}
}

const updateProfile = async(req, res) => {
try {
  const userId = req.user._id;

  // Extract fields to update from request body
  const { name } = req.body;

  // Validate input fields
  if (!name) {
    return res.status(400).json({ msg: "At least one field is required to update" });
  }

  // Prepare the update object
  const updateData = {};
  if (name) updateData.name = name;

  // Update user profile in the database
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password -salt");

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  // Send updated user profile in the response
  res.status(200).json({ msg: "Profile updated successfully", user });
} catch (err) {
  console.error(err);
  res.status(500).json({ msg: "Internal Server Error" });
}
}

module.exports = { signUp, signIn, getProfile, updateProfile};
