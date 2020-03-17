var express = require("express");
var router = express.Router();
const Note = require("../models/Note");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Express" });
});

// get note detail with id

router.post("/getNotesById", async (req, res) => {
  var params = req.body;
  console.log("Parameter", params);
  await Note.noteDetail(params, (err, response) => {
    if (err) {
      console.log("Error", err);
      res.json({
        status: false,
        error: err
      });
    } else {
      console.log("respnse", response);
      if (response.length == 0) {
        res.json({
          status: false,
          data: response,
          message: "No Detail Found"
        });
      } else {
        res.json({
          status: true,
          data: response,
          message: "ok"
        });
      }
    }
  });
});

// get the notes list

router.get("/notes", async (req, res) => {
  await Note.noteList((err, response) => {
    if (err) {
      console.log("Error", err);
      res.json({
        status: false,
        error: err
      });
    } else {
      console.log("respnse", response);
      if (response.length == 0) {
        res.json({
          status: false,
          data: response,
          message: "No Detail Found"
        });
      } else {
        res.json({
          status: true,
          data: response,
          message: "ok"
        });
      }
    }
  });
});

// create new notes

router.post("/createNotes", async (req, res) => {
  var params = req.body;
  await Note.noteCreate(params, (err, response) => {
    if (err) {
      res.json({
        status: false,
        error: err
      });
    } else {
      // console.log("response", response);
      res.json({
        status: true,
        message: "note create successfully"
      });
    }
  });
});

// update notes

router.post("/updateNote", async (req, res) => {
  var params = req.body;
  var note_id = params.note_id;
  await Note.noteUpdate(note_id, params, (err, response) => {
    if (err) {
      res.json({
        status: false,
        error: err
      });
    } else {
      // console.log("notes update success", response);
      if (response.length == 0) {
        res.json({
          status: false,
          data: response,
          message: "no data found"
        });
      } else {
        res.json({
          status: true,
          data: response,
          message: "note update successfully"
        });
      }
    }
  });
});

// Delete note

router.post("/deleteNote", async (req, res) => {
  var params = req.body;
  await Note.noteDelete(params, (err, response) => {
    if (err) {
      res.json({
        status: false,
        error: err
      });
    } else {
      // console.log("delete response", response);
      if (!response) {
        res.json({
          status: false,
          message: "not data found"
        });
      } else {
        res.json({
          status: true,
          message: "note delete successfully"
        });
      }
    }
  });
});

module.exports = router;
