let travelModel = require('../models/sequelizeTravelModel');
let travelController = {};
//const paginate = require('express-paginate');

travelController.getTravels = function(req,res,next)
{
  travelModel.findAll().then()
};


// PANEL ADMINISTRACION DE VIAJES

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
});


router.get('/admintable/hideTravel/:id', (req, res, next)=>{
    travelModel.hideTravel(req.params.id, (error, cb)=>{
        if(error) res.status(500).json(error);
        else res.redirect('/admintable');
    })
});

router.post('/admintable/create',upload.single('file'), function (req,res,next) {
    console.log(req.file);
    let travel={
        travel:req.body.travel,
        description:req.body.description,
        price:req.body.price,
        tipo:req.body.tipo,
        image:req.file.path
    };
    travel.image = travel.image.replace("\\", "/");
    travelModel.travelCreate(travel,(error,trav)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admintable');
        }
    })

});

router.get('/admintable/travelDelete/:id', (req,res,next)=> {
    travelModel.travelDelete(req.params.id,(error,cb)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admintable');
        }
    })
});

module.exports = travelController;