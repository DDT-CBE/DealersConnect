import jwt from "jsonwebtoken";
import SuperDealerModel from "../Model/SuperDealerModel.js";
import DealerModel from "../Model/DealerModel.js";
import SubDealerModel from "../Model/SubDealerModel.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Token" });
  }

  jwt.verify(authHeader, process.env.SECRET_KEY, async (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const { id, type } = decode; // Extract type from token

    
    

    try {
      let user;
      if (type === "Company 2") {
        user = await SuperDealerModel.findOne({auth_id:id});
      } else if (type === "Dealer") {
        user = await DealerModel.findOne({auth_id:id});
      } else if (type === "Sub Dealer") {
        user = await SubDealerModel.findOne({auth_id:id});
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user ; // Attach user and type to req.user
     
      
      next();
    } catch (error) {
      console.error("Error verifying user:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

export default verifyToken;
