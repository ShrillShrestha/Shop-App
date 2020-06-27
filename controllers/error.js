exports.get404 = (req, res, next)=>{
    res.render('404', {pageTitle: 'Error!', admin:false,
    isAuth: req.session.isLoggedin});
};