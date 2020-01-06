$(document).ready(function() {
  $("#submit").click(function() {
    var data = {"email" : $("#id").val(), "password" : $("#pwd").val()};
	var response = grecaptcha.getResponse();
	console.log(response);
        $.ajax({
        type: "POST",
        url: "https://enigmatic-chamber-09650.herokuapp.com/account/auth",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: data,
        success: function(data) {
          //登入成功
          if(data.token){
            sessionStorage.setItem("token", data.token);
            window.location="../main/User.html";
          }
        },
        error: function(data) {
          alert("failed" + JSON.stringify(data.responseJSON));
        }
      });
})});
