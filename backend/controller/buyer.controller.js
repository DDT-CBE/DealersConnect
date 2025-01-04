import RegisterModel from "../Model/RegisterModel.js";

export const getBuyer = async (req, res) => {
  try {
    const query = { approve: true }; // Only approved users

    // Add filters for name and/or state if provided
    if (req.query.industry) {
      query.industry = {
        $regex: req.query.industry, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.category) {
      query.category = {
        $regex: req.query.category, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.district) {
      query.district = {
        $regex: req.query.district, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }
    if (req.query.state) {
      query.state = {
        $regex: req.query.state, // Search for partial matches
        $options: "i", // Case-insensitive search
      };
    }

    // Find users matching the query
    const getUsers = await RegisterModel.find(query);

    // If no users found, return a message
    if (getUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Otherwise, send the found users
    res.json(getUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const buyerRegister = async (req, res) => {
  try {
    const addUser = await RegisterModel.create(req.body); // Saving the approved user data
    res.json(addUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to save user" });
  }
};

export const getSingleBuyer = async (req,res) => {
  const {id} = req.params
  try {
    const singleUser = await RegisterModel.findById(id); // Create a new user in the database
    res.status(201).json(singleUser); // Respond with the created user
  } catch (error) {
    console.error("GetSingleBuyer error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

//Admin page

export const getbuyerRequest = async (req, res) => {
  try {
    const getUser = await RegisterModel.find();
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
};

export const approveBuyer= async (req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

 await RegisterModel.findByIdAndUpdate(id, { approve }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
};


export const removeBuyer = async (req, res) => {
  const { id } = req.params;
  try {
    const removeUser = await RegisterModel.findByIdAndDelete(id);
    res.status(201).json(removeUser);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateBuyer = async (req, res) => {
  const { id } = req.params;
  const { numberhide } = req.body;

 await RegisterModel.findByIdAndUpdate(id, { numberhide }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
};
