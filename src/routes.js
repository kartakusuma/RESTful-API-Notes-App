const { saveNote, getAllNotes, getNoteById, updateNote, deleteNote } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: saveNote,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotes,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteById,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateNote,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNote,
    },
];

module.exports = routes;