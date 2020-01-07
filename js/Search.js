var global_data;
var fcn = function(id) {
  let content = "";
  user = JSON.stringify(global_data[id].name);
  if (global_data[id].tfda && global_data[id].greenRestaurant) {
    content += `
        <ul class="test">
  
          <li>名稱：${global_data[id].name}</li>
          <li>營業：${global_data[id].opening ? "營業中" : "未營業"}</li>
          <li>地址：${global_data[id].address}</li>
          <li>評分：${global_data[id].rating}</li>
          <li>評分數：${global_data[id].ratingCount}</li>
          <li>TFDA序號: ${global_data[id].tfdaSerial}</li>
          <li>綠色餐廳類型: ${global_data[id].greenType}</li>
          <li>綠色餐廳回饋內容: ${global_data[id].greenContent}</li>
          <li>綠色餐廳備註: ${global_data[id].greenPS}</li>
          <a><img src="../img/FDA.png"></a>
          <a><img src="../img/Taichung.jpg"></a>
        </ul>
        `;
  } else if (global_data[id].greenRestaurant) {
    content += `
        <ul class="test">
  
          <li>名稱：${global_data[id].name}</li>
          <li>營業：${global_data[id].opening ? "營業中" : "未營業"}</li>
          <li>地址：${global_data[id].address}</li>
          <li>評分：${global_data[id].rating}</li>
          <li>評分數：${global_data[id].ratingCount}</li>
          <li>綠色餐廳類型: ${global_data[id].greenType}</li>
          <li>綠色餐廳回饋內容: ${global_data[id].greenContent}</li>
          <li>綠色餐廳備註: ${global_data[id].greenPS}</li>
          <a><img src="../img/Taichung.jpg"></a>
        </ul>
        `;
  } else if (global_data[id].tfda) {
    content += `
        <ul class="test">
  
          <li>名稱：${global_data[id].name}</li>
          <li>營業：${global_data[id].opening ? "營業中" : "未營業"}</li>
          <li>地址：${global_data[id].address}</li>
          <li>評分：${global_data[id].rating}</li>
          <li>評分數：${global_data[id].ratingCount}</li>
          <li>TFDA序號: ${global_data[id].tfdaSerial}</li>
          <a><img src="../img/FDA.png"></a>
        </ul>
        `;
  } else {
    content += `
        <ul class="test">
  
          <li>名稱：${global_data[id].name}</li>
          <li>營業：${global_data[id].opening ? "營業中" : "未營業"}</li>
          <li>地址：${global_data[id].address}</li>
          <li>評分：${global_data[id].rating}</li>
          <li>評分數：${global_data[id].ratingCount}</li>
        </ul>
        `;
  }
  console.log(global_data[id].name);
  document.getElementById("info").innerHTML = content;
  // $('#info').text(content);
};
var add = function(id) {
  var data = {"shopName" : global_data[id].name, "address" : global_data[id].address, "type" : $("#simpleSearch").val(), "rating" : global_data[id].rating};
  $.ajax({
    type: "POST",
    url: "https://enigmatic-chamber-09650.herokuapp.com/data/myList/set",
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    data: data,
    headers: {
      "X-Auth-Token": sessionStorage.getItem("token")
    },
    success: function(data) {
      alert("新增成功!!");
    },
    error: function(data) {
      alert("新增失敗!!");
    }
  });
};

$(document).ready(function() {
  $("#sailorTable").tablesorter();
  $('i').addClass('no-after');
  $("#exampleModal").on("shown.bs.modal", function() {
    $("#myInput").trigger("focus");
  });

  function getLocation() {
    debugger;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPos);
    } else {
      alert("瀏覽器不支援定位功能!");
    }
  }

  function getPos(position) {
    sessionStorage.setItem("latitude", position.coords.latitude);
    sessionStorage.setItem("longitude", position.coords.longitude);
  }

  function updateTable(data, filter = false) {
    $("#sailorTable tbody").empty();
    $("table").show();
    if (true) {
      for (index in data) {
        var sourceLocation = new google.maps.LatLng(
          sessionStorage.getItem("latitude"),
          sessionStorage.getItem("longitude")
        );
        var distanceLocation = new google.maps.LatLng(
          data[index].latitude,
          data[index].longitude
        );
        var path = google.maps.geometry.spherical.computeDistanceBetween(
          sourceLocation,
          distanceLocation
        );

        if ($("#star").val() == "1") {
          if (data[index].rating < 3) continue;
          else {
            
            var td1 = $("<td class='name test2'>").text(data[index].name);
            var td2 = $("<td class='test2'>").html(data[index].opening ? "<font color='green'>營業中</font>" : "<font color='red'>未營業</font>");
            var td3 = $("<td class='address test2'>").text(data[index].address);
            var td4 = $("<td class='rating test2' align='center'>").text(data[index].rating);
            var td5 = $("<td class='ratingCount test2' align='center'>").text(data[index].ratingCount);
            var td6 = $("<td class='floor test2' align='center'>").text(Math.floor(path));
            var td7 = $("<td class='rating test2' align='center'>").text("");
            var td8 = $("<td>").html(
              `<button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal" id=${index} onclick="fcn(this.id)"> <i aria-hidden="true"></i> <span class="fs-it-btn-vertical-line"></span>  詳細資料</button>`
            );
            var td9 = $("<td>").html(
              `<CENTER><button type="button" class="btn btn-outline-primary" id=${index} onclick="add(this.id)">加入最愛</button></CENTER>`
            );
            if (data[index].tfda && data[index].greenRestaurant) {
              td7.html('<img style="display:block;width:100%" src="../img/FDA.png"><img style="display:block;width:100%" src="../img/Taichung.jpg">');
            }
            else if(data[index].tfda) {
              td7.html('<img style="display:block;width:100%" src="../img/FDA.png">');        
            }
            else if(data[index].greenRestaurant) {
              td7.html('<img style="display:block;width:100%" src="../img/Taichung.jpg">');
            }
            var tr = $("<tr>").append(td1, td2, td3, td4, td5, td6, td7, td8, td9);
            $("table").append(tr);
          }
        }
        else if ($("#star").val() == "2") {
          if (data[index].rating < 4) continue;
          else {
            var td1 = $("<td class='name test2'>").text(data[index].name);
            var td2 = $("<td class='test2'>").html(data[index].opening ? "<font color='green'>營業中</font>" : "<font color='red'>未營業</font>");
            var td3 = $("<td class='address test2'>").text(data[index].address);
            var td4 = $("<td class='rating test2' align='center'>").text(data[index].rating);
            var td5 = $("<td class='ratingCount test2' align='center'>").text(data[index].ratingCount);
            var td6 = $("<td class='floor test2' align='center'>").text(Math.floor(path));
            var td7 = $("<td class='rating test2' align='center'>").text("");
            var td8 = $("<td>").html(
              `<button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal" id=${index} onclick="fcn(this.id)"> <i aria-hidden="true"></i> <span class="fs-it-btn-vertical-line"></span>  詳細資料</button>`
            );
            var td9 = $("<td>").html(
              `<CENTER><button type="button" class="btn btn-outline-primary" id=${index} onclick="add(this.id)">加入最愛</button></CENTER>`
            );
            if (data[index].tfda && data[index].greenRestaurant) {
              td7.html('<img style="display:block;width:100%" src="../img/FDA.png"><img style="display:block;width:100%" src="../img/Taichung.jpg">');
            }
            else if(data[index].tfda) {
              td7.html('<img style="display:block;width:100%" src="../img/FDA.png">');        
            }
            else if(data[index].greenRestaurant) {
              td7.html('<img style="display:block;width:100%" src="../img/Taichung.jpg">');
            }
            var tr = $("<tr>").append(td1, td2, td3, td4, td5, td6, td7, td8, td9);
            $("table").append(tr);
          }
        } else {
            var td1 = $("<td class='name test2'>").text(data[index].name);
            var td2 = $("<td class='test2'>").html(data[index].opening ? "<font color='green'>營業中</font>" : "<font color='red'>未營業</font>");
            var td3 = $("<td class='address test2'>").text(data[index].address);
            var td4 = $("<td class='rating test2' align='center'>").text(data[index].rating);
            var td5 = $("<td class='ratingCount test2' align='center'>").text(data[index].ratingCount);
            var td6 = $("<td class='floor test2' align='center'>").text(Math.floor(path));
            var td7 = $("<td class='rating test2' align='center'>").text("");
            var td8 = $("<td>").html(
            `<button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal" id=${index} onclick="fcn(this.id)"> <i aria-hidden="true"></i> <span class="fs-it-btn-vertical-line"></span>  詳細資料</button>`
          );
          var td9 = $("<td>").html(
              `<CENTER><button type="button" class="btn btn-outline-primary" id=${index} onclick="add(this.id)">加入最愛</button></CENTER>`
          );
          if (data[index].tfda && data[index].greenRestaurant) {
            td7.html('<img style="display:block;width:100%" src="../img/FDA.png"><img style="display:block;width:100%" src="../img/Taichung.jpg">');
          }
          else if(data[index].tfda) {
            td7.html('<img style="display:block;width:100%" src="../img/FDA.png">');        
          }
          else if(data[index].greenRestaurant) {
            td7.html('<img style="display:block;width:100%" src="../img/Taichung.jpg">');
          }
          var tr = $("<tr>").append(td1, td2, td3, td4, td5, td6, td7, td8, td9);

          $("table").append(tr);
        }
      }
    }
    $("#sailorTable").trigger("update")
  }

  getLocation();

  $("#submit").click(function() {
    $("#sailorTable tbody").empty();
    if(sessionStorage.getItem("latitude") == null || sessionStorage.getItem("longitude") == null) {
      alert("尚未獲得位置資訊，請嘗試重新整理畫面!!");
      return;
    }
    var distance = 0;
    distance = $("#distance").val();
    if (
      $("#distance")
        .val()
        .trim() == ""
    ) {
      distance = 500;
    }
    console.log(distance);
    $.ajax({
      type: "GET",
      url: "https://enigmatic-chamber-09650.herokuapp.com/search/food",
      data: {
        distance: distance,
        latitude: sessionStorage.getItem("latitude"),
        longitude: sessionStorage.getItem("longitude"),
        keyword: $("#simpleSearch").val()
      },
      headers: {
        "X-Auth-Token": sessionStorage.getItem("token")
      },
      async: true,
      success: function(data) {
        if (data.count == 0) {
          alert("查無資料!");
          $("#sailorTable tbody").empty();
          $("table").show();
          
          var td1 = $("<td class='name test2'>").text("查無資料");
          var td2 = $("<td class='test2'>").text("查無資料");
          var td3 = $("<td class='address test2'>").text("查無資料");
          var td4 = $("<td class='rating test2' align='center'>").text("查無資料");
          var td5 = $("<td class='ratingCount test2' align='center'>").text("查無資料");
          var td6 = $("<td class='floor test2' align='center'>").text("查無資料");
          var td7 = $("<td class='rating test2' align='center'>").text("查無資料")
          var td8 = $("<td>").html(
            `<button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal" id=${index} onclick="fcn(this.id)"> <i aria-hidden="true"></i> <span class="fs-it-btn-vertical-line"></span>  詳細資料</button>`
          );
          var td9 = $("<td>").html(
            `<CENTER><i class="fa fa-plus fa-2x" id=${index +
                "add"}></i></CENTER>`
          );
          var tr = $("<tr>").append(td1, td2, td3, td4, td5, td6, td7, td8, td9);

          $("table").append(tr);
        } else {
          global_data = data.data;
          updateTable(data.data);
        }
      },
      error: function(data) {}
    });
  });
  // $("#submit1").click(function() {
  //   getLocation();
  //   $.ajax({
  //     type: "GET",
  //     url: "https://enigmatic-chamber-09650.herokuapp.com/search/food",
  //     data: {
  //       distance: $("#distance").val(),
  //       latitude: sessionStorage.getItem("latitude"),
  //       longitude: sessionStorage.getItem("longitude"),
  //       keyword: $("#simpleSearch").val()
  //     },
  //     headers: {
  //       "X-Auth-Token": sessionStorage.getItem("token")
  //     },
  //     async: true,
  //     success: function(data) {
  //       if (data.count == 0) {
  //         alert("查無資料!");
  //         $("#sailorTable tbody").empty();
  //         $("table").show();
  //         var td1 = $("<td>").text("查無資料");
  //         var td2 = $("<td>").text("查無資料");
  //         var td3 = $("<td>").text("查無資料");
  //         var td4 = $("<td>").text("查無資料");
  //         var td5 = $("<td>").text("查無資料");
  //         var tr = $("<tr>").append(td1, td2, td3, td4, td5);
  //         $("table").append(tr);
  //       } else {
  //         updateTable(data.data, true);
  //       }
  //     },
  //     error: function(data) {}
  //   });
  // });
});
