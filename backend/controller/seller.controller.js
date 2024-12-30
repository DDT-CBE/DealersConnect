import SellerModel from "../Model/SellerModel.js";

export const getSeller = async (req, res) => {
  try {
    const query = {
      approve: true, // Ensure only approved users are fetched
    };
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
    const getUser = await SellerModel.find(query);
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
};

export const sellerRegister = async (req, res) => {
  try {
    const newUser = await SellerModel.create(req.body); // Create a new user in the database
    res.status(201).json(newUser); // Respond with the created user
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Admin Page

export const getsellerRequest = async (req, res) => {
  try {
    const getUser = await SellerModel.find({ approve: false });
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
};


export const approveSeller = async(req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

  await SellerModel.findByIdAndUpdate(id, { approve }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
};


export const updateSeller = async (req, res) => {
  const { id } = req.params;
  const { numberhide } = req.body;

  await SellerModel.findByIdAndUpdate(id, { numberhide }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
};



export const removeSeller = async (req, res) => {
  const { id } = req.params;
  try {
    const removeUser = await SellerModel.findByIdAndDelete(id);
    res.status(201).json(removeUser);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};