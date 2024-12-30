import jwt from "jsonwebtoken";

const generateToken = (user) =>
  jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "60m" });

export default generateToken;
