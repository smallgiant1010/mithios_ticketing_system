const { Router } = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadFile, downloadFile, removeFile, getPageOfFiles } = require("../controllers/fileController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.use(requireAuth);

router.get("/file/files", getPageOfFiles);

router.post("/file/upload", upload.array("files", 10), uploadFile);

router.delete("/file/delete/:fileID", removeFile);

router.get("/file/download/:filename", downloadFile);

module.exports = router;
