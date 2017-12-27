const fs = require('fs');
const notes = require('./notes.js');
const _ =  require('lodash');
const yargs = require('yargs');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
.command('add','Add a new note',{
    title: titleOptions,
    body: bodyOptions
})
.command('list','List all notes',{})
.command('read','Read a note',{
    title: titleOptions
})
.command('remove','Remove a note',{
    title: titleOptions 
})
.help()
.argv;



if(argv._[0] === 'add'){
    var note = notes.addNote(argv.title,argv.body);
    if(note){
        console.log('Note created');
       notes.logNote(note);
    }else{
        console.log('Note title taken');
    }
}else if(argv._[0]==='remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note Was removed" : "Note not found";
    console.log(message);
}else if(argv._[0]==='read'){
    var note = notes.getNote(argv.title);
    if(note){
        notes.logNote(note);
    }else{
        console.log('dont search');
    }
}else if(argv._[0]=='list'){
    var allNotes = notes.getall();
    console.log('Printing ',allNotes.length);
    allNotes.forEach(note => notes.logNote(note));
};

