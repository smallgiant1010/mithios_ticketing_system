const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const nodemailer = require("nodemailer");
require("dotenv").config();

const MAXAGE =  1000 * 3600 * 24 * 30;
const MAXCODE = 999999;
const MINCODE = 100000;

const errorHandler = (err) => {
  const errors = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  if(err.message == "Account Not Found") {
    errors["username"] = err.message;
  }

  if(err.message == "Incorrect Password") {
    errors["password"] = err.message;
  }

  if(err.cause && err.cause.code == 11000) {
    errors["username"] = err.message;
  }
  
  if(err.message.includes("account validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
 
  return errors;
};

const tokenHandler = (id, username, res) => {
  const token = jwt.sign({ id }, process.env.SECRET, {
    algorithm: "HS256",
    expiresIn: "30d",
    issuer: username,
  });
  res.cookie("jwt", token, {
    maxAge: MAXAGE,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
}

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const account = await Account.login(username, password);
    tokenHandler(account._id, account.username, res);
    res.status(200).json({ id: account._id, username: account.username, role: account.role });
  } catch(err) {
    console.log(err);
    const errors = errorHandler(err);
    res.status(400).json(errors);
  }
};

const postSignup = async (req, res) => {
  const accountInfo = req.body;
  try {
    const account = await Account.create(accountInfo);
    res.status(200).json({ id: account._id, username: account.username, role: account.role });
  } catch (err) {
    const errors = errorHandler(err);
    console.log(err.message);
    res.status(400).json(errors);
  }
};

const postLogout = (req, res) => {
  const { _id } = res.locals.user;
  if(req.cookies && !req.cookies.jwt) {
    res.status(500).json({ error: "User Could Not Be Logged Out" });
  }
  res.cookie("jwt", "", { maxAge: 1 });
  res.locals.user = null;
  res.status(200).json({ id: _id });
};

const getUserInfo = (_, res) => {
  const account = res.locals.user;
  if(!account) {
    res.status(404).json({ error: "User Account Not Found" });
  } else {
    res.status(200).json({...account, password: "*".repeat(10)});
  }
};

const getAllUsers = async (_, res) => {
  try {
    const users = await Account.find({}, { username: 1, role: 1, email: 1 });
    return res.status(200).json({ users });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}

const postResetPassword = (req, res) => {
  const { email } = req.query;
  const randomCode = Math.floor(Math.random() * (MAXCODE - MINCODE + 1) + MINCODE);
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Code To Reset Password From Mithios Helpdesk",
    text: `Your Code Is ${randomCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log(error);
      res.status(500).json({ error: "There Was An Issue With Sending Your Authentication Code" });
    } else {
      res.status(200).json({ authCode: randomCode });
    }
  });
};

const patchNewPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const dummy = await Account.create({ username: "dummy", email: "dummy@dummy.dum", password: newPassword, role: "Programmer" });
    const removal = await Account.findOneAndDelete({ username: "dummy" });
  } catch(err) {
    const errors = errorHandler(err);
    return res.status(400).json(errors);
  }
  try {
    const user = await Account.findOneAndUpdate({ email }, { $set: { password: newPassword } }, { runValidators: true, context: "query" });
    res.status(200).json({ id: user._id });
  } catch(err) {
    const errors = errorHandler(err);
    res.status(500).json(errors);
  }
};

module.exports = { getAllUsers, postLogin, postLogout, getUserInfo, postSignup, postResetPassword, patchNewPassword };
