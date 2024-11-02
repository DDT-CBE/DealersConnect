const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const SignupModel = require("./Model/signup");
const RegisterModel = require("./Model/RegisterModel");
const SellerModel = require("./Model/SellerModel");
const path = require("path");
const verifyToken = require("./middelware");
const generateToken = require("./utlis");
const UserInfoModel = require("./Model/UserinfoModel");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.dburl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// get route for signup
app.get("/getdata", async (req, res) => {
  try {
    const getUser = await RegisterModel.find();
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
});

app.get("/getsellerrequest", async (req, res) => {
  try {
    const getUser = await SellerModel.find({ approve: false });
    res.json(getUser); // Send the retrieved users as JSON response
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" }); // Optional: handle error and send a response
  }
});

app.get("/getsellerdata", async (req, res) => {
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
});

app.post("/signup", async (req, res) => {
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
});

app.get("/data", verifyToken, async (req, res) => {
  const user = req.user; // Get the user from verifyToken middleware
  try {
    res.status(200).json(user); // Return user data with 200 OK
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); // Handle server errors
  }
});

// POST route for sellerregister

app.post("/sellerregister", async (req, res) => {
  try {
    const newUser = await SellerModel.create(req.body); // Create a new user in the database
    res.status(201).json(newUser); // Respond with the created user
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete route for signup
app.delete("/removeid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removeUser = await SignupModel.findByIdAndDelete(id);
    res.status(201).json(removeUser);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getbuyerdata", async (req, res) => {
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
});

// POST route for login
app.post("/formregister", async (req, res) => {
  try {
    const addUser = await RegisterModel.create(req.body); // Saving the approved user data
    res.json(addUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password, type } = req.body;

  try {
    const loggedUser = await SignupModel.findOne({ email }); // Find user by email

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
});

app.put("/updatedata/:id", (req, res) => {
  const { id } = req.params;
  const { numberhide } = req.body;

  RegisterModel.findByIdAndUpdate(id, { numberhide }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

  RegisterModel.findByIdAndUpdate(id, { approve }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/updatesellerdata/:id", (req, res) => {
  const { id } = req.params;
  const { approve } = req.body;

  SellerModel.findByIdAndUpdate(id, { approve }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/updateseller/:id", (req, res) => {
  const { id } = req.params;
  const { numberhide } = req.body;

  SellerModel.findByIdAndUpdate(id, { numberhide }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/removebuyerregister/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removeUser = await RegisterModel.findByIdAndDelete(id);
    res.status(201).json(removeUser);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/removesellerregister/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removeUser = await SellerModel.findByIdAndDelete(id);
    res.status(201).json(removeUser);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// Start the server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
