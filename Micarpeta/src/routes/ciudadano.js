const router = require('express').Router(); //Facilita la creacion de rutas
const { isAuthenticated } = require('../helpers/auth');
const https = require('http');
var request = require('request');
const User = require('../models/User');

const Ciudadano = require('../models/Ciudadano');

router.get('/ciudadano/registro', isAuthenticated,(req, res)=>{
  res.render('ciudadano/registro');
});

router.post('/ciudadano/registro/', isAuthenticated,async (req, res) =>{
  const { id, name, address, email, operatorId, operatorName} = req.body;
    request.post({
    url:     'http://govCarpetaApp.mybluemix.net/apis/registerCitizen',
    form:    { id: id, name: name, address: address, email: email, operatorId: operatorId, operatorName: operatorName }
      },async function(error, response, body){
          if(error){
            req.flash('error_msg', 'Error no se pudo registrar el usuario');
            res.redirect('/ciudadano/registro');
          }else{
            const password = name.lenght + address.lenght
            req.flash('success_msg', body);
            const ciud = await new Ciudadano({id, name, address, email, operatorId, operatorName, password});
            await ciud.save();
            res.redirect('/ciudadano/registro');
          }
      });
  });



module.exports = router;