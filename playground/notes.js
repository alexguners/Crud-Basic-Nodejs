const fs = require('fs');

//Read notes from json file
var fetchNotes = () =>{
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }catch(e){
        return [];
    }
};

//Save note in json file
var saveNotes = (notes) => fs.writeFileSync('notes-data.json',JSON.stringify(notes));

//Add note in array about notes
var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

//Check if there is any duplicate note
var duplicateNotes = notes.filter((note)=> note.title === title);

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }

};

//Remove a specific note and save json file
var removeNote = (title) =>{
    var notes = fetchNotes();
    var existNote = notes.filter((note) => note.title != title);
    saveNotes(existNote);   

    return notes.length !== existNote.length;
};

//Read a unique note from parameter
var getNote= (title) => {
    var notes = fetchNotes();
    var readNote = notes.filter((note) => note.title===title);
    return readNote[0];
};

//Design Log
var logNote = (note) => {
    console.log('===');
    console.log('Title ',note.title);
    console.log('Body ',note.body);  
};

//Get All notes from json file
var getall = () => {
    return fetchNotes();
};

//Exports functions
module.exports = {
    addNote,
    removeNote,
    getNote,
    logNote,
    getall
};