$(document).ready(function() {
  if(sessionStorage.getItem("token") == null) {
    alert("請重新登入!");
    window.location.href = "../Login/Login.html";
  }
  else {
    $.ajax({
      type: "GET",
      url: "https://enigmatic-chamber-09650.herokuapp.com/data/myList/get",
      headers: {
        "X-Auth-Token": sessionStorage.getItem("token")
      },
      async: true,
      success: function(data) {
        console.log(JSON.stringify(data));
        updatePageContent(data.data);
        counter_set();
      },
      error: function(data) {
        alert("failed" + JSON.stringify(data.responseJSON));
      }
    });
  }
  $(".cat-list li").addClass("fnd");
  function counter_set() {
    $(".cat-list").each(function() {
      var cnt = $(this).children(".cat-list li.fnd").length;

      $(this)
        .parent()
        .parent()
        .parent()
        .find(".incat-count")
        .text(cnt);
    });
  }

  counter_set();

  $(".srch").keyup(function() {
    var txt = $(this)
      .val()
      .toLowerCase();
    $(".cat-list li").filter(function() {
      var mt =
        $(this)
          .text()
          .toLowerCase()
          .indexOf(txt) > -1;
      $(this).toggle(mt);
      $(this).toggleClass("fnd", mt);
    });
    counter_set();
  });
});

function updatePageContent(data) {
  for(var i in data) {
    var mainDiv = document.createElement("div");
    var headerDiv = document.createElement("div");
    var cardDiv = document.createElement("div");
    var dataDiv = document.createElement("div");
    var cardName = document.createElement("a");
    var itemList = document.createElement("ul");
    var shopRating = data[i].data.map(item => Object.values(item)[2]);
    var shopName = data[i].data.map(item => Object.values(item)[3]);
    var shopAddress = data[i].data.map(item => Object.values(item)[0]);

    mainDiv.setAttribute("class", "card");

    headerDiv.setAttribute("class", "card-header");
    headerDiv.setAttribute("role", "tab");
    headerDiv.setAttribute("id", "heading".concat(i));

    cardName.setAttribute("data-toggle", "collapse");
    cardName.setAttribute("href", "#collapse".concat(i));
    cardName.setAttribute("aria-expanded", "true");
    cardName.setAttribute("aria-controls", "collapse".concat(i));
    cardName.append(" "+i);

    headerDiv.innerHTML += '<span class="badge badge-primary badge-pill incat-count">0</span>';
    headerDiv.append(cardName);
    headerDiv.innerHTML += '<i class="fa fa-ellipsis-v pull-right" style="float: right;"></i>';
    mainDiv.append(headerDiv);

    cardDiv.setAttribute("id", "collapse".concat(i));
    cardDiv.setAttribute("class", "collapse");
    cardDiv.setAttribute("role", "tabpanel");
    cardDiv.setAttribute("aria-labelledby", "heading".concat(i));

    dataDiv.setAttribute("class", "card-body p-0");

    itemList.setAttribute("class", "list-group cat-list");

    //清單內容Loop
    for (let len = 0; len < data[i].data.length; len++ ) {
      itemList.innerHTML += '<li class="list-group-item fnd">店家名稱: ' + shopName[len] + ', 店家地址: ' + shopAddress[len] + ', 店家評分: ' + shopRating[len];
    }

    dataDiv.append(itemList);
    cardDiv.append(dataDiv);
    mainDiv.append(cardDiv);
    $("#accordion").append(mainDiv);
  }
}