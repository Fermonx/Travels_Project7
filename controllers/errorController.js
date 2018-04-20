var errorController = {};

errorController.getErrorPage = (req, res, next)=>{
    res.render('404.hbs', {
        isAdmin: req.session.isAdmin,
        isUser: req.session.username,
        title: 'Oops!',
        layout: 'layout'
    });
}

module.exports = errorController;