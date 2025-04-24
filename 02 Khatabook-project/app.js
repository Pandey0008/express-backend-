const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const mongooseconnection = require("./config/mongoose");
const khataModel = require("./models/khata");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route - Show all Hisaab Files
app.get("/", async (req, res) => {
  try {
    fs.readdir("./hisaab", (err, files) => {
      if (err) return res.status(500).send("Error reading files.");
      res.render("index", { files });
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Render Create Page
app.get("/create", (req, res) => {
  res.render("create");
});

// Create a New Hisaab Entry
app.post("/createhisaab", async (req, res) => {
  try {
    let currDate = new Date();
    let date = `${currDate.getDate()}-${currDate.getMonth() + 1}-${currDate.getFullYear()} (${currDate.getHours()}.${currDate.getMinutes()}.${currDate.getSeconds()})`;
    let filename = `${req.body.title} ${date}.txt`;

    await khataModel.create({
      title: req.body.title,
      details: req.body.content,
    });

    fs.writeFile(`./hisaab/${filename}`, req.body.content, (err) => {
      if (err) return res.status(500).send("Error saving file.");
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Edit a Hisaab Entry
app.get("/edit/:filename", async (req, res) => {
  try {
    let filename = req.params.filename;
    let title = filename.split(" ")[0]; // Extract title from filename

    let user = await khataModel.findOne({ title });

    fs.readFile(`./hisaab/${filename}`, "utf-8", (err, filedata) => {
      if (err) return res.status(500).send("Error reading file.");
      res.render("edit", { filedata, filename });
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update a Hisaab Entry
app.post("/update/:filename", async (req, res) => {
  try {
    let filename = req.params.filename;
    let title = filename.split(" ")[0];

    await khataModel.findOneAndUpdate({ title }, { details: req.body.content }, { new: true });

    fs.writeFile(`./hisaab/${filename}`, req.body.content, (err) => {
      if (err) return res.status(500).send("Error updating file.");
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// View a Specific Hisaab Entry
app.get("/hisaab/:filename", (req, res) => {
  try {
    let filename = req.params.filename;
    fs.readFile(`./hisaab/${filename}`, "utf-8", (err, filedata) => {
      if (err) return res.status(500).send("Error reading file.");
      res.render("hisaab", { filedata, filename });
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Delete a Hisaab Entry
app.get("/delete/:filename", async (req, res) => {
  try {
    let filename = req.params.filename;
    let title = filename.split(" ")[0];

    await khataModel.findOneAndDelete({ title });

    fs.unlink(`./hisaab/${filename}`, (err) => {
      if (err) return res.status(500).send("Error deleting file.");
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("App listening on port http://localhost:3000");
});
