const router = require('express').Router(); //Facilita la creacion de rutas
const User = require('../models/User'); //Importo el esquema de User.js
const nodemailer = require('nodemailer'); //Modulo para enviar correos
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

var http = require('http');

var smtransport = nodemailer.createTransport({ 
    service: 'Gmail', 
    auth:{
        user: 'micarpeta321@gmail.com',
        pass: 'micarpeta2345'
    }
});

router.get('/usuarios/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/usuarios/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/usuarios/signin',
    failureFlash: true
}));

router.get('/usuarios/registrarse', (req, res) => {
    res.render('users/signup');
});

// ===========================================================================================
//Registro de un usuario al operador
router.post('/usuarios/registrarse', async(req, res) =>{
    var {name, apellido, cedula, emailreg, password, confirm_password, address, operatorName} = req.body;
    const errors = [];

    //Si no ingreso nada o la contraseña es < a 4 caracteres o no son iguales
    if(name.lenght <= 0){
        errors.push({text: 'Ingresa un nombre'});
    }
    if(password != confirm_password){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'La contraseña debe ser mayor a 4 caracteres'});
    }
    //Reviso si la cedula ya esta registrada
    const usCedula = await User.findOne({cedula: cedula});
    if(usCedula){
        errors.push({text: 'Esa cedula ya esta registrada'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, apellido, cedula, password, confirm_password, address, operatorName});
    }else{
        //Codigo para enviar correo
        const email = name + cedula +'@carpetacolombia.co';
        var correo = '<strong>Hola tu correo es: </strong>' + email;
        var mailOptions = {
            from: 'Carpeta Ciudadana',
            to: emailreg,
            subject: 'Asunto',
            text: 'Registro Operador Mi Carpeta',
            html: correo
        };
        const emailpro = emailreg;
        name = name + " " + apellido;
        //Codigo para crear un nuevo usuario
        const newUser = new User({name, email, emailpro, cedula, password, address, operatorName});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        smtransport.sendMail(mailOptions);
        req.flash('success_msg', 'Estas registrado tu email es: ' + email);
        res.redirect('/usuarios/signin');
    }
});

// ===========================================================================================

router.get('/usuarios/password', isAuthenticated, async (req, res) =>{
    res.render('users/password');
});

router.post('/usuarios/password/', isAuthenticated,  async(req, res)=>{
    const id = req.user.id;
    const us = await User.findById(id);
    const errors = [];
    const correct = await us.matchPassword(req.body.passwordAct);
    if(!correct){
        errors.push({text: 'Tu contraseña no es correcta'});
    }
    if(req.body.newPassword.lenght < 4){
        errors.push({text: 'La contraseña es muy corta'});
    }
    if(req.body.newPassword != req.body.confirmPassword){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(errors.length > 0){
        res.render('users/password', {errors});
    }else{
        const newPass = await us.encryptPassword(req.body.newPassword);
        await User.findByIdAndUpdate(id, {password: newPass});

        const email = us.emailpro;
        var correo = '<strong>Hola tu nueva contraseña es: </strong>' + req.body.newPassword;
        var mailOptions = {
            from: 'Carpeta Ciudadana',
            to: email,
            subject: 'Asunto',
            text: 'Registro Operador Mi Carpeta',
            html: correo
        };

        smtransport.sendMail(mailOptions);

        req.flash('success_msg', 'Contraseña cambiada exitosamente');
        res.redirect('/usuarios/password');

    }
});

router.get('/usuarios/validar', isAuthenticated, (req, res) =>{
    res.render('users/validar');
});

router.post('/usuarios/validar/', isAuthenticated, (req, res)=>{
    console.log('http://govCarpetaApp.mybluemix.net/apis/validateCitizen/' + req.body.id);
    const reque = http.get('http://govCarpetaApp.mybluemix.net/apis/validateCitizen/' + req.body.id, (resp) => {
        let data = ''
        resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        req.flash('success_msg',JSON.parse(data));
        res.redirect('/usuarios/validar');
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
});

router.get('/usuarios/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
});

module.exports = router;