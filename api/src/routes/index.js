const { Router } = require("express");
const breedRouter = require("./breed/breedRouter.js");

const router = Router();
router.use("/", breedRouter);

module.exports = router;
