let express = require('express');
let router = express.Router();
let travelController = require('../controllers/travelController');

// PANEL ADMINISTRACION DE VIAJES

router.get('/admintrable',function(req,res,next) {
   travelController.getTravelsAdmin(req,res,next);
});


router.get('/admintable/hideTravel/:id', (req, res, next)=>{
    travelModel.hideTravel(req.params.id, (error, cb)=>{
        if(error) res.status(500).json(error);
        else res.redirect('/admintable');
    })
});
/*
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
*/
module.exports = router;



/*
router.get('/create', (req, res, next)=>{
    req.session.username = 'Fernando';
    res.redirect('/admins');
});

router.get('/remove',(req,res,next)=>{
    req.session.username = null;
    res.redirect('/admins');
}); */