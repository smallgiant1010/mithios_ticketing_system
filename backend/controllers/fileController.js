const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
let gfs;

mongoose.connection.once("open", () => {
  gfs = new GridFSBucket(mongoose.connection.db, {
    bucketName: "upload",
  });
  console.log("Connected to GFS");
});

const uploadFile = (req, res) => {
  let metadata = {};
  try {
    if(req.body?.metadata) metadata = JSON.parse(req.body.metadata);
  } catch(err) {
    res.status(500).json({ error: "Invalid Metadata Format" });
  }
   
  if(!req.files || req.files.length === 0) {
    res.status(400).json({ error: "Something Went Wrong With The File Upload" });
  }

  res.status(201).json(metadata);
}

const downloadFile = (req, res) => {
  const fileName = req.params.filename;
  const downloadStream = gfs.openDownloadStreamByName(fileName); 
  downloadStream.on('error', (err) => {
    console.error("GridFS Error: ", err);
    if(err.message === 'FileNotFound') return res.status(404).json({ error: "File Not Found" });
    return res.status(500).json({ error: err.message });
  });

 // downloadStream.on('data', (chunk) => {
 // console.log("First Chunk Of File Data: ", chunk.slice(0, 100).toString('utf8'));
 // });

  downloadStream.on('end', () => {
    console.log("Finished Streaming File: ", fileName)
  });

  res.set('Content-Type', 'application/octet-stream');
  res.set('Content-Disposition', `attachment; filename="${fileName}"`);
  
  console.log("Response headers before piping: ", res.getHeaders());
  downloadStream.pipe(res);
}

const removeFile = async (req, res) => {
  const fileID = req.params.fileID;
  try {
    if(!mongoose.isValidObjectId(fileID)) {
      return res.status(401).json({ error: "Invalid ID" });
    } 
    await gfs.delete(new mongoose.Types.ObjectId(fileID));
    res.status(200).json({ _id: fileID });
  } catch(err) {
    console.log(err);
    res.status(404).json({ error: "File Not Found" });
  }
} 

const getPageOfFiles = async (req, res) => {
  const { query, page } = req.query;
  try {
    const conditions = ["metadata.phase", "filename", "metadata.username", "metadata.user_id"].map(field => ({
      [field]: { $regex: query , $options: "i" }
    }));
    const cursor = gfs.find({ $or: conditions }).sort( { uploadDate: -1 } ).skip((parseInt(page) - 1) * 20).limit(20);
    const metadata = await cursor.toArray();
    res.status(200).json(metadata);
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: "There was an error connecting to the drive" });
  }
}

module.exports = { uploadFile, downloadFile, removeFile, getPageOfFiles };



