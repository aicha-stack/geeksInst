const fs = require('fs');
const path = 'notes.json'; 
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(path);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};
const saveNotes = (notes) => {
    fs.writeFileSync(path, JSON.stringify(notes));
};
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicate = notes.find(note => note.title === title);

    if (duplicate) {
        console.log('Note already exists');
        return;
    }

    notes.push({ title, body });
    saveNotes(notes);
    console.log('Note added!');
};
const removeNote = (title) => {
    const notes = loadNotes();
    const filtered = notes.filter(note => note.title !== title);

    if (notes.length === filtered.length) {
        console.log('Note not found');
        return;
    }

    saveNotes(filtered);
    console.log('Note removed!');
};

// List all notes
const listNotes = () => {
    const notes = loadNotes();
    console.log('Your Notes:');
    notes.forEach(note => console.log('-', note.title));
};

// Read a note
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (!note) {
        console.log('Note not found');
        return;
    }

    console.log(`Title: ${note.title}\nBody: ${note.body}`);
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};
