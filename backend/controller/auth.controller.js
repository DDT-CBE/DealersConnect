import SignupModel from "../Model/signup.js";
import UserInfoModel from "../Model/UserinfoModel.js";
import generateToken from "../utlis/index.js";


export const signupController = async (req, res) => {
  try {
    const { name, email, type, id } = req.body;

    // Check if a user with the same email and role already exists
    const checkuser = await SignupModel.findOne({ email, type });

    // If email and role exist, return a message
    if (checkuser) {
      return res
        .status(400)
        .json({ message: "This email and Role Type already exist" });
    }

    // If email and role do not exist, create a new user
    const newUser = await SignupModel.create(req.body); // Create a new user in the database
    const newAuthuser = await UserInfoModel.create({
      name,
      auth_id: newUser._id,
      type,
    });

    res.status(201).json(newAuthuser); // Respond with the created user
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const loginController =  async (req, res) => {
  const { email, password, type } = req.body;

  try {
    const loggedUser = await SignupModel.findOne({ email: email, type: type }); // Find user by email

    if (!loggedUser) {
      return res.status(404).json({ message: "User not found" }); // If no user found
    }

    if (loggedUser.password === password && loggedUser.type === type) {
      const token = generateToken(loggedUser);

      res.status(201).json({ token });
    } else {
      res.status(401).json("Not Allow");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLoggedUser = async (req, res) => {
  const user = req.user; // Get the user from verifyToken middleware
  try {
    res.status(200).json(user); // Return user data with 200 OK
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); // Handle server errors
  }
};