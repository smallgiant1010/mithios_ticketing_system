const fs = require("fs");
const multer = require("multer");

const memory = multer.memoryStorage();

module.exports = multer({ memory });
