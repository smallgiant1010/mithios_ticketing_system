// Imports
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();

// The Storage that multer will refer to
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: async (req, file) => {
    return new Promise((resolve, reject) => {
      // Encrypt with random bytes to avoid collisions
      let metadata = {}
      crypto.randomBytes(16, (err, buffer) => {
        try {
          if(req.body?.metadata) metadata = JSON.parse(req.body.metadata);
        } catch(e) {
          return reject(new Error("Invalid Metadata Object"));
        }

        // If an error occurs, we reject the file that is being encrypted
        if(err) return reject(err);

        // Hex creates a unique filename
        const filename = buffer.toString("hex") + path.extname(file.originalname);
        resolve({
          filename,
          bucketName: "upload",
          metadata,
        });
      })
    });
  }
});

module.exports = multer({ storage, limits: { files: 10 } });
