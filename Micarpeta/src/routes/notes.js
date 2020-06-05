const router = require('express').Router(); //Facilita la creacion de rutas
const multer = require('multer');
const upload = multer({dest: 'public/img/archivos'})
const ciudadano = require('../models/Ciudadano');
const http = require('http');

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-notes');
});

router.post('/notes/add/', isAuthenticated, async (req, res) => {
    const doc = new Note();
    doc.name = req.body.file;
    doc.path = 'public/img/archivos/' + req.file.filename;
    const tor = req.body.file;
    const tor1 = 'public/img/archivos/' + req.file.filename
    doc.user = 'user01'
    console.log(doc);
    await doc.save();
    
    const reque = http.get('http://govCarpetaApp.mybluemix.net/apis/authenticateDocument/' + req.body.id + '/' + tor1.path + '/' + req.body.file, (resp) => {
        let data = ''
        resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
          console.log(JSON.parse(data));
        req.flash('success_msg', JSON.parse(data));
        res.redirect('/notes');
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      res.redirect('/notes');
    });
});

router.get('/', isAuthenticated, (req, res) => {
    res.sendFile('/notes/edit-notes.hbs', {root: __dirname})
});

router.get('/notes', isAuthenticated, async (req, res) =>{
    await Note.find({user: req.user.id})//Saco los arhivos de la base de datos
        .then(archivos =>{ //los guardo en archivos
            const context = { //creo una variable para meter los archivos
                notes: archivos.map(archivos =>{ //mapeo los archivos
                    return { //devuelvo de manera ordenada los archivos
                        name: archivos.name,
                        filename: archivos.filename,
                        path: archivos.path,
                        date: archivos.date
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
    req.flash('success_msg', 'Archivo actualizado');
    res.redirect('/notes');
});

router.get('/notes/file/:id', isAuthenticated, (req, res) => {
    res.send('Archivo');
});

router.delete('/notes/delete/:id', isAuthenticated, async(req, res) =>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Archivo eliminado');
    res.redirect('/notes');
});

module.exports = router;