const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if(token) {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if(err) {
        res.locals.user = null;
        res.status(500).json({ error: err.message });
      } else {
        console.log(decoded.id);
        const account = await Account.findById(decoded.id, "_id username email role").lean();
        res.locals.user = account;
        next();
      }
    });
  } else {
    res.status(404).json({ error: "User Is Not Logged In" });
  }
}

module.exports = { requireAuth };
