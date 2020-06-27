exports.isAuthenticated = (req, res, next) => {
    if(req.session.isLoggedin){
        next();
    }else{
        res.redirect('/login');
    }
}