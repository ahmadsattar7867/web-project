const multer = require("multer")
const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }));
require("dotenv").config()
const bcrypt = require("bcrypt")
const File = require("../Models/File.js")

async function handleDownload(req, res) {
    const file = await File.findById(req.params.id)

    if (file.password != null) {
        if (req.body.password == null) {
            res.render("password")
            return
        }

        if (!(await bcrypt.compare(
            req.body.password, file.password))) {
            res.render("password", { error: true })
            return
        }
    }

    file.downloadCount++
    await file.save()
    res.download(file.path, file.originalName)
}

module.exports = { handleDownload };

