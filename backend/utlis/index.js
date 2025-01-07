import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = {
    id : user._id,
    type:user.type
  };

 return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "60m" });
};

export default generateToken;
