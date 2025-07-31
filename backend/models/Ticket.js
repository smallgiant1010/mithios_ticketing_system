const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter A Title For This Ticket"],
  },
  image_str: {
    type: [String],
    validate: [{
      validator: (v) => {
        return v.length <= 2;
      },
      message: "Image Limit Reached",
    }],
  },
  priority: {
    type: Number,
    required: [true, "Please Assign A Priority"],
    enum: { 
      values: [1, 2, 3, 4, 5],
      message: "Please Enter A Valid Priority Level",
    },
  },
  team: {
    type: String,
    default: "Any",
    enum: {
      values: ["Programmer", "Artist", "Manager", "Any"],
      message: ["Please Assign A Valid Team To The Ticket"],
    },
  },
  issued_user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "The User ID Is Missing"],
  },
  issued_user: {
    type: String,
    required: [true, "The User Name Is Missing"],
  },
  resolved: {
    type: Boolean,
  }
}, { timestamps: true });

module.exports = mongoose.model("ticket", ticketSchema);
