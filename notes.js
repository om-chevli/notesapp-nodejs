const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log(chalk.green('Note Added Succefully!'))
    } else {
        console.log(chalk.red('This title already exists in another note.'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        return JSON.parse(dataBuffer);
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newJSON = notes.filter((note) => title !== note.title)
    if (notes.length === newJSON.length) {
        console.log(chalk.red.bold('Note with title', title, 'was not found!'))
    } else {
        console.log(chalk.bgGreen('Removing Note with title', title, '....'))
        saveNotes(newJSON)
        console.log(chalk.green.bold('Note Removed!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold("\nYour Notes:"))
    notes.forEach(note => {
        console.log(note.title)
    });

}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find(note => note.title === title)
    if (noteToRead) {
        console.log(chalk.bold(noteToRead.title) + "\n" + noteToRead.body)
    } else {
        console.log(chalk.red('Note not found.'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes,
}