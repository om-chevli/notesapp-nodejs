const chalk = require('chalk');
const yargs = require('yargs')
const notes = require('./notes');

// console.log(chalk.italic.bold(notes.getNotes()));


yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: 'To add notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Body for note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { notes.addNote(argv.title, argv.body) }
});

yargs.command({
    command: 'remove',
    describe: 'It will remove notes.',
    builder: {
        title: {
            describe: 'title for note to be removed',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) { notes.removeNote(argv.title) }
})

yargs.command({
    command: 'list',
    describe: 'It lists all your notes.',
    handler() { notes.listNotes() }
})

yargs.command({
    command: 'read',
    describe: 'Get to read notes.',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) { notes.readNotes(argv.title) }
})

yargs.parse()
    // console.log(yargs.argv);