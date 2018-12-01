$("#signUp").on("click", function (event) {
  event.preventDefault();

  console.log("Entered add account button.")
  var newAccount = {
    name: $("#nameUp").val().trim(),
    email: $("#emailUp").val().trim(),
    account_key: $("#passwordUp").val().trim(),
    account_key2: $("#passwordConfirm").val().trim()
  };
  console.log("newAccount: ", newAccount);
  if (newAccount.account_key.length > 0 && newAccount.email.length > 0 && newAccount.account_key.length > 0 && newAccount.name.length > 0) {
    if(newAccount.account_key === newAccount.account_key2){
      $.post("/signup", newAccount, function(results) {
        console.log("login");
        window.location.href = "/";
      })
      
    } else {
      console.log("**passwords don't match**");
      $("#create-err-msg").empty("").text("**Passwords don't match**");
      console.log("password: ", newAccount.passwordUp)
    };
  } else {
    console.log("**Please fill out entire form**");
    $("#create-err-msg").empty("").text("**Please fill out entire form**");
  }
});








$("#signIn").on("click", function (event) {
  event.preventDefault();
  
  var user = {
    email: $("#emailIn").val().trim(),
    account_key: $("#passwordIn").val().trim()
  }

  $.post("/login", user, function(results) {
    if(results) {
      $(location).attr('href', '/index')
    }else {
      $("#account-info").modal("close");
      alert("oops something went wrong, please try again!");

    }
   
  })

});




$("#logout").on("click", function(event) {
  event.preventDefault();
  $.get("/logout", function(results) {
    console.log("results: ", results);
    $(location).attr("href", "/");
  });
});