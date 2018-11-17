module.exports = function(app){

    app.get("/", function(req,res){
        if(req.isAuthenticated()){
            var user = {
                id: req.session.passport.user,
                isloggedin: req.isAuthenticated()
            }
            res.render("index", user);
        }
        else{
            res.render("login");
        }
        
    })


    app.get("/signup", function(req,res){
        if(req.isAuthenticated()){
            res.redirect("/index");
        }else{
           res.render("signup"); 
        }
    });

    app.get("/index", function(req,res){
        if(req.isAuthenticated()){
            res.render("index");
        }else{
            res.redirect("/login");
        }
    });
    
    app.get("/login", function(req, res) {
        if(req.isAuthenticated()){
            res.redirect("/index");
        }else{
            res.render("login");
        }
    })


};