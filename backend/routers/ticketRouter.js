const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const { getSpecificUserTickets, patchSpecificTicket, postCreateTicket, getPageOfTickets, getSpecificTicket, deleteSpecificTicket } = require("../controllers/ticketController");
const upload = require("../middleware/fileMiddleware");

const router = Router();
router.use(requireAuth);

router.post("/ticket/create", upload.array('images', 4), postCreateTicket);

router.get("/ticket/getPage", getPageOfTickets);

router.get("/ticket/getSpecific", getSpecificTicket);

router.delete("/ticket/remove", deleteSpecificTicket);

router.patch("/ticket/update", patchSpecificTicket);

router.get("/ticket/user", getSpecificUserTickets);

module.exports = router;
