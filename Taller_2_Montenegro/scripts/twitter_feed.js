function addNewTweet(autor, tweet, imagen="", link, fecha){


  var aut= $("<h5/>", {
    "class": "autor-tweet col-12",
    html: "@"+autor+", dijo:"
  });

  var tuit=$("<p/>",{
    "class": "tweet col-8",
    html: "\""+tweet+"\""
  });

  var twm=$("<img/>",{
    "class": "tw-image col-4 col-md-4 col-lg-4 col-sm-4",
    "src": "imagenes/tw.png"
  })

  var tw=$("<div/>",{
    "class": "tw-div col-12"
  });

  var img=$("<p/>",{
    "class": "imagen-tweet",
    html: imagen
  });

  var lnk= $("<a/>",{
    "class": "link-tweet col-12",
    "href": link,
    html: link
  });

  var date=$("<time/>",{
    "class": "time-tweet col-12 d-flex justify-content-end",
    "datetime": fecha,
    html: fecha
  });

  var div=$("<div/>",{
    "class": "tweet-container row"
  });

  aut.appendTo(div);
  twm.appendTo(tw);
  tuit.appendTo(tw);
  tw.appendTo(div);
  if (imagen!="") img.appendTo(div);
  lnk.appendTo(div);
  date.appendTo(div);

  div.appendTo("#tweets");


}


function loadTweets(kw){

  var yu="https://twitrss.me/twitter_search_to_rss/?term=";
  let xmurl=yu+kw;
  $.ajax({
    type:"GET",
    url: xmurl,
    dataType: "xml",
    success: function (xml){

      $(xml).find('item').each(function(){

        var aut= $(this).find('dc\\:creator').text();
        aut=aut.slice(3,aut.length-1);
        var des= $(this).find('title').text();
        var dt= $(this).find('pubDate').text();
        var lnk= $(this).find('link').text();
        var im= $(this).find('img').text();

        addNewTweet(aut,des,im,lnk,dt);


      });

    },
    error: function () {
      console.log("No se puede leer");
      alert("Error en xml");

    }
  });

}



$(document).ready(function(){

$(".tweets-container").hide();

  $(".btn").click(function(e){

    var texto = $('input#clave').val();

    if(texto.length != 0) {

      var tweets = $('#tweets .tweets-container');
      $(".tweets-container").empty();
      $(".tweets-container").show();
      var bsq=$("<p/>",{
        "class": "tbsq",
        html: texto
      });



      bsq.appendTo("#tweets");

      loadTweets(texto);



      $('#tweets .tweets-container').filter(function(index){

        $(this).show();
        var tweet = $(this).text()
        if(tweet.indexOf(texto) == -1) {
          $(this).hide()
        }
      });
    }
    else {
      $('#tweets .tweets-container').each(function(){

        $(this).show();
      });
    }
    //evita el efecto burbuja
    //return false;

  })
});
