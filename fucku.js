var obj = { "appid":"abo","encryptkey":"123qWe" };
$.ajax({
	type: 'POST',
	url: 'http://webapi.isdc.io:2000/api/auths/apilogin',
	data: obj,
	success: function(data) {
		console.log(data);
		}
	})