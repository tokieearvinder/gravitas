const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema(
  {
    title: String,
    description: String
  },
  {
    timestamps: true
  }
);


const Note = mongoose.model("Note", noteSchema);
module.exports = Note;

module.exports.noteDetail = (params, callback) => {
  Note.find({ _id: params.note_id }, callback);
};

module.exports.noteList = callback => {
  Note.find(callback);
};

module.exports.noteCreate = (params, callback) => {
  var add_notes = new Note(params);
  add_notes.save(callback);
};

module.exports.noteUpdate = (note_id, params, callback) => {
  console.log("note_id", note_id);
  function clean(obj) {
    for (var propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === "" ||
        obj[propName] === undefined ||
        obj[propName] === "undefined"
      ) {
        delete obj[propName];
      }
    }
    console.log(obj);
    return obj;
  }
  var update = clean(params);
  Note.findByIdAndUpdate(note_id, update, { new: true }, callback);
};

module.exports.noteDelete = (params, callback) => {
  Note.findOneAndRemove({ _id: params.note_id }, callback);
};
