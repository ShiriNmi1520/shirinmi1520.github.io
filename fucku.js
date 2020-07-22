var obj = { "appid":"abo","encryptkey":"123qWe" };
$.ajax({
	type: 'POST',
	url: 'https://webapi.isdc.io/api/auths/apilogin',
	data: obj,
	success: function(data) {
		console.log(data);
		}
	})
