const Ticket = require("../models/Ticket");
const mongoose = require("mongoose");

const FIELDS = Object.entries(Ticket.schema.paths)
.filter(([_, path]) => path.instance === 'String')
.map(([key]) => key);

const errorHandler = (err) => {
  const errors = {
    title: "",
    image_str: "",
    priority: "",
    team: "",
    issued_user_id: "",
    issued_user: "",
  }

  if(err.message.includes("Issuer Id Mismatch")) {
    errors["issued_user_id"] = err.message;
  }

  if(err.message.includes("Issuer Mismatch")) {
    errors["issued_user"] = err.message;
  }

  if(err.message.includes("ticket validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const fileHandler = (files) => {
  if(files && files.length > 0) {
    return files.map((f) => {
      const base64String = f.buffer.toString('base64');
      return `data:${f.mimetype};base64,${base64String}`;
    });
  }

  return [];
}

const postCreateTicket = async (req, res) => {
  const { _id, username } = res.locals.user;
  const details = JSON.parse(req.body.metadata);

  const files = req.files;
  try {
    const formattedFiles = fileHandler(files);
    const ticket = await Ticket.create({ issued_user_id: _id, issued_user: username, image_str: formattedFiles, ...details });
    res.status(200).json({ id: ticket._id });
  } catch(err) {
    // console.log(err);
    const errors = errorHandler(err);
    res.status(400).json(errors);
  }
};

const getPageOfTickets = async (req, res) => {
  const { query, sortType, order, page } = req.body;
  try {
    const conditions = FIELDS.map((field) => ({
      [field]: { $regex: `/${query}/i` }
    }));
    const tickets = await Ticket.find({ $or: conditions }, { image_str: 0, issued_user_id: 0, createdAt: 0 }).skip((page - 1) * 20).limit(20).sort( { sortType: order } )
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSpecificTicket = async (req, res) => {
  const id = req.query.id;
  try {
    const ticket = await Ticket.findById(id).lean();
    if(ticket) {
      res.status(200).json(ticket);
    } else {
      throw new Error("Ticket Not Found");
    }
  } catch(err) {
      res.status(500).json({ error: err.message });
  }
};

const authenticateTicketUser = (ticket, username, id) => {
    if(ticket.issued_user_id.toString() !== id.toString()) { 
      throw new Error("Issuer Id Mismatch");
    }
    if(ticket.issued_user.toString() !== username) {
      throw new Error("Issuer Mismatch");
    } 
}

const deleteSpecificTicket = async (req, res) => {
  const { id } = req.query;
  const { _id, username } = res.locals.user;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `${id} Invalid Id` });
    }
    const ticket = await Ticket.findById(id, "_id issued_user_id issued_user").lean();
    if(!ticket) {
      return res.status(404).json({ error: `Ticket ${id} Not Found` });
    }
    authenticateTicketUser(ticket, username, _id);
    const removedTicket = await Ticket.findByIdAndUpdate(id, { $set: { resolved: true } }).lean();
    res.status(200).json({ id: removedTicket._id });
  } catch(err) { 
    const errors = errorHandler(err);
    res.status(403).json(errors);
  }
};

const patchSpecificTicket = async (req, res) => {
  const { id } = req.query;
  const { _id, username } = res.locals.user;
  const changes = req.body;
  try {
    const ticket = await Ticket.findById(id, "_id issued_user_id issued_user").lean(); 
    authenticateTicketUser(ticket, username, _id);
    const updatedTicket = await Ticket.findByIdAndUpdate(id, { $set: changes }).lean();
    res.status(200).json({ id: updatedTicket._id });
  } catch(err) {
    const errors = errorHandler(err);
    res.status(403).json(errors);
  }
};

const getSpecificUserTickets = async (req, res) => {
  const { _id, username } = res.locals.user;
  try {
    const tickets = await Ticket.find({ issued_user_id: new mongoose.Types.ObjectId(_id), issued_user: username });
    res.status(200).json(tickets);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSpecificUserTickets, patchSpecificTicket, postCreateTicket, getPageOfTickets, getSpecificTicket, deleteSpecificTicket };
