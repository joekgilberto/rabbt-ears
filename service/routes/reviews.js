const { requireToken } = require('../middleware/auth');

const express = require('express')
const router = express.Router()

const reviewsCtrl = require('../controllers/battles')

router.get("/", reviewsCtrl.index);

router.get("/:id", reviewsCtrl.show);

router.post("/", requireToken, reviewsCtrl.create);

router.put("/:id", requireToken, reviewsCtrl.update);

router.delete("/:id", requireToken, reviewsCtrl.delete);

module.exports = router

