const bodyParser = require('body-parser');
const express = require("express")
const fs  = require("fs");
const path = require("path");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
    const data = req.body;
    console.log(data);
})

module.exports = router;