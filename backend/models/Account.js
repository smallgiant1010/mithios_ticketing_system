//Imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter A Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter A Email"],
    validate: { 
      validator: (v) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: "Please Enter A Valid Email Address", 
    }
  },
  password: {
    type: String,
    required: [true, "Please Enter A Password"],
    minLength: [8, "Please Enter Atleast 8 Characters"],
    validate: [{
      validator: (v) => {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v);
      }, 
      message: `Please Include A Special Character In Your Password`,
    }, 
    {
      validator: (v) => {
        return /[0-9]+/.test(v);
      },
      message: "Please Include A Number In Your Password",
    }],
  },
  role: {
    type: String,
    required: [true, "Please Mention Which Role You Hold"],
    enum: {
      values: ["Programmer", "Artist", "Manager"],
      message: "Please Assign Yourself A Role",
    },
  },
});

accountSchema.pre('save', async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

accountSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  const salt = await bcrypt.genSalt();
  update["$set"].password = await bcrypt.hash(update["$set"].password, salt);
  this.setUpdate(update);
  next();
});

accountSchema.statics.login = async function(username, password) {
  const account = await this.findOne({ username });
  if(account) {
    const check = await bcrypt.compare(password, account.password);
    if(check) {
      return account;
    } else {
      throw new Error("Incorrect Password");
    }
  } else {
    throw new Error("Account Not Found");
  }
};


module.exports = mongoose.model("account", accountSchema);

