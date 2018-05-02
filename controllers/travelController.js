let travelModels = require('../models/sequelizeTravelModel');
let travelController = {};
let Multer = require('multer');
let upload = require('../config/multer');

//const paginate = require('express-paginate');

class indexCont{
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
    }
}


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
  travelModels.findAll().then(retrieveTravel=>{
      if(retrieveTravel)
      {
          res.render('admin', {
              title: 'ADMIN VIEW',
              layout: 'layout',
              retrieveTravel: retrieveTravel
          });
      }
  })
};

travelController.travelCreate = function(req,res,next)
{
    let travels={
        travel:req.body.travel,
        description:req.body.description,
        price:req.body.price,
        tipo:req.body.tipo,
        image:req.file.path
    };
    console.log(travels);
    travels.image = travels.image.replace("\\", "/");
  travelModels.findOrCreate({where:{travel: travels.travel}, defaults:{description: travels.description, price: travels.price, tipo: travels.tipo, image: travels.image}})
      .then(travel=>{
        if(travel)
        {
            res.redirect('/admins/admintable');
        }
      })
};

travelController.travelDelete = function(req,res,next)
{

    let reqId = req.params.id;
    console.log(reqId);
    travelModels.findOne({where:{id: reqId}}).then(viaje=>{
        if(viaje) viaje.destroy();
    }).then(()=>{
        res.redirect('/admins/admintable');
    })

};

travelController.travelHide = function(req,res,next)
{
    let reqId = req.params.id;
    travelModels.findOne({where:{id: reqId}}).then(desactivar=>{
        if(desactivar)
        {
            if(desactivar.active == 0) desactivar.updateAttributes({active: 1});
            else if(desactivar.active == 1) desactivar.updateAttributes({active: 0});

        }
        res.redirect('/admins/admintable');
    })
};

// CARRITO

travelController.checkout = function(req,res,next)
{
    res.render('checkout',{
        title:'GHT Checkout',
        layout: 'layout',
        noTravel: true
    })
};

travelController.checkoutAdd = function(req,res,next)
{
    let reqId = req.params.id;
    var carrito = [];
    travelModels.findOne({where:{id: reqId}}).then(checkTravel=>{
        if(checkTravel)
        {
            checkTravel.push(carrito);
            res.render('checkout',{
                title: 'Checkout',
                layout: 'layout',
                checkTravel: checkTravel,
                carrito: carrito,
                noTravel: false
            })
        }
    })
};


module.exports = travelController;