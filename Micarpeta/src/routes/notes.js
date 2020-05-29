const router = require('express').Router(); //Facilita la creacion de rutas

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-notes');
});

router.post('/notes/new-notes', isAuthenticated, async(req, res) =>{
    const { title, description } = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Por favor ingresa un titulo'});
    }
    if(!description){
        errors.push({text: 'Por favor ingresa una descripcion'});
    }
    if(errors.length > 0){
        res.render('notes/new-notes' , {
            errors,
            title,
            description
        });
    }else{
        const newNote = new Note({title, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg' , 'Nota agregada');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req, res) =>{
    await Note.find({user: req.user.id})//Saco los arhivos de la base de datos
        .then(archivos =>{ //los guardo en archivos
            const context = { //creo una variable para meter los archivos
                notes: archivos.map(archivos =>{ //mapeo los archivos
                    return { //devuelvo de manera ordenada los archivos
                        id: archivos._id,
                        title: archivos.title, 
                        description: archivos.description
                    }
                })
            }
            res.render('notes/all-notes', { notes: context.notes });
        })
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-notes', {note: note.toObject()});
});

router.put('/notes/edit-notes/:id', isAuthenticated, async(req, res) =>{
    const {title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Nota actualizada');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async(req, res) =>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada');
    res.redirect('/notes');
});

module.exports = router;