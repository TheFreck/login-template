var db = require("../models");

var passport = require('passport');

module.exports = function (app) {

  app.get("/accounts/view", function (req, res) {
   
    if(req.isAuthenticated()){

      db.Accounts.findOne({
        where:{
          uuid: req.session.passport.user
        }
      }).then(function(dbUser){
        var user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        }
        res.render("index", user);
      })
       
    }
    else {
      var user = {
          id: null,
          isloggedin: req.isAuthenticated()
        }
      res.redirect("/");
    }
   
});

    // logout
  app.get('/logout', function(req, res) {
      req.session.destroy(function(err){
        req.logout();
        res.clearCookie('name');
        res.clearCookie('user_id');
        res.redirect('/');
      })
  });

// process the signup form ==============================================
//=======================================================================

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (! user) {
        return res.send({ success : false, message : 'authentication failed' });
      }
      
      req.login(user, function(err) {
        if (err) {
          console.log("err", err)
          return next(err);
        }
        console.log('redirecting....');
        
        res.cookie('name', user.name);
        res.cookie('user_id', user.uuid );
        return res.redirect("/index");
      });      
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      console.log("user: " + user);
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status

      if (!user) {
        console.log("no user");
        return res.send({ success : false, message : 'authentication failed'});
      }
      
      req.login(user, function(err) {
        if (err) {
          console.log("err", err)
          return next(err);
        }
        console.log('redirecting....');
        
        res.cookie('name', user.name);
        res.cookie('user_id', user.uuid );
        return res.redirect("/index");
      });        
    })(req, res, next);
  });

}