import DealerModel from "../Model/DealerModel.js";
import SignupModel from "../Model/signup.js";
import SubDealerModel from "../Model/SubDealerModel.js";
import SuperDealerModel from "../Model/SuperDealerModel.js";
import generateToken from "../utlis/index.js";


export const signupController = async (req, res) => {
  try {
    const { name, email, type, id, phone } = req.body;

    // Check if a user with the same email and role already exists
    const checkuser = await SignupModel.findOne({ email, type });

    if (checkuser) {
      return res.status(400).json({ message: "This email and Role Type already exist" });
    }

    // Create a new user in the database
    const newUser = await SignupModel.create(req.body);

    // Handle SuperDealer signup
    if (type === "Company 2") {
      const superDealer = await SuperDealerModel.create({
        name,
        auth_id:newUser._id,
        email,
        type,
        phone,
        dealers: [], // Initialize empty dealers array
      });
      return res.status(201).json(superDealer);
    }

    // Handle Dealer signup
    if (type === "Dealer") {
      const dealer = await DealerModel.create({
        name,
        auth_id:newUser._id,
        email,
        type,
        phone,
        superDealer:id,
        subDealers: [], // Initialize empty subDealers array
      });

      // Add dealer to the SuperDealer's `dealers` array
      const superDealer = await SuperDealerModel.findById(id); // `id` is the SuperDealer's ID
      if (!superDealer) {
        return res.status(404).json({ message: "SuperDealer not found" });
      }

      superDealer.dealers.push(dealer._id);
      await superDealer.save();

      return res.status(201).json(dealer);
    }

    // Handle SubDealer signup
    if (type === "Sub Dealer") {
      const subDealer = await SubDealerModel.create({
        name,
        auth_id:newUser._id,
        email,
        type,
        phone,
        dealer:id
      });

      // Add subDealer to the Dealer's `subDealers` array
      const dealer = await DealerModel.findById(id); // `id` is the Dealer's ID
      if (!dealer) {
        return res.status(404).json({ message: "Dealer not found" });
      }

      dealer.subDealers.push(subDealer._id);
      await dealer.save();

      return res.status(201).json(subDealer);
    }

    return res.status(201).json(newUser);
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