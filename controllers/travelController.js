const Multer = require('multer');
const upload = require('../config/multer');
let travelModels = require('../models/sequelizeTravelModel');
let travelController = {};


//const paginate = require('express-paginate');

travelController.getTravels = function(req,res,next)
{
  travelModels.findAll({where:{active: 1}}).then(retrieveTravel=>{
      if(retrieveTravel){
      res.render('index',{
          title: 'Geekshub Tours',
          layout: 'layout',
          retrieveTravel: retrieveTravel
      });
      }
  })
};

travelController.getTravelsAdmin = function(req,res,next)
{
  travelModels.findAll({where:{id}}).then(travelPanel=>{
      if(travelPanel)
      {
          res.render('admin', {
              title: 'ADMIN VIEW',
              layout: 'layout',
              travelPanel: travelPanel
          });
      }
  })
};


/*
router.get('/admintable', function (req, res, next)
{
    permisos = req.session.isAdmin;
    sesion = req.session.username;
    if(permisos == 1)
    {
        travelModel.fetchTravel((error, retrieveTravel)=> {
            if (retrieveTravel) {
                res.render('admin.hbs', {
                    title: 'ADMIN VIEW',
                    layout: 'layout',
                    isAdmin: permisos,
                    isUser: sesion,
                    retrieveTravel: retrieveTravel
                });
            }
        });
    }
    else res.redirect('/');
});*/

module.exports = travelController;