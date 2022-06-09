const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const notes = require('./notes');

const saveNote = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id, title, createdAt, updatedAt, tags, body,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotes = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteById = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const updateNote = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toDateString();

    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex !== -1) {
        notes[noteIndex] = {
            ...notes[noteIndex],
            title,
            updatedAt,
            tags,
            body,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNote = (request, h) => {
    const { id } = request.params;

    const noteIndex = notes.findIndex((note) => note.id === id);
    
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}


module.exports = { saveNote, getAllNotes, getNoteById, updateNote, deleteNote }