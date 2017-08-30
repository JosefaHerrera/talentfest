$(document).ready(function() {
    var facebookId = 1234568;
    var faceArray = [];
/*  window.fbAsyncInit = function() {
    FB.init({
      appId            : '1650641148293432',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });
    FB.AppEvents.logPageView();
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  function statusChangeCallback(response){
    FB.api('/me', {fields: 'last_name'}, function(response) {
  console.log(response.id);
  facebookId = response.id;
  console.log(response);
});
  }
  function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
*/
    //llamado todos los eventos
   $.ajax({
           url: 'http://dev.skynouk.com/talent/api/getEvents',
           type: 'GET',
           datatype: 'JSON',
       })
       .done(function(response) {
  
           response.data.events.forEach(function(el){
             $(".events").append(
      '<div class="card card-inverse card-primary mb-3 ' + el.category_id + '">'+
        '<div class="card-block">'+
          '<blockquote class="card-blockquote">'+
            '<div class="row">' +
                  
              '<div class="col-sm-12 col-xs-12 text-center">' +
                  '<h3>' + el.title + '</h3>' + 
                   '<p class="text-muted">'+ el.category_name +'</p>' + 
              '</div>' +
                 '<div class="col-sm-12 col-xs-12">' +
                  '<div class="col-sm-6 col-xs-6">' +
                 
                  '<h5>' + el.date + '</h5>' +
                  '</div>' +
                  '<div class="col-sm-6 col-xs-6">' +
                  '<button type="button" class="btn btn-info calendar-'+ el.id +'">Quiero ir</button>' +
                  '<a href="#'+ el.id +'" data-toggle="modal">Leer Mas</a>' + 
                  '</div>' +
                  '</div>' +
            
                  '<div class="col-sm-12 col-xs-12 text-center">' +
                  '<p>evaluación</p>' +
                  '</div>' +
              '</div>'+
            '</blockquote>'+
          '</div>'+
         '</div>');
              $(".modal-items").append(
                                  '<div class="modal fade" id="' + el.id + '">' +
                                    '<div class="modal-dialog">' +
                                      '<div >' +
                                        '<button type="button" class="btn btn-success" data-dismiss="modal">X</button>' +
                                      '</div>' +
                                      '<img src="' + el.image_url + '"class="img-responsive">' +
                                      '<div class="header-modal">' +
                                          '<h3>' + el.title + '</h3>' +
                                          '<h5>'+ el.category_name +'</h5>' +
                                          '<h6>' + el.perform_with + '</h6>' +
                                        '</div>' +
                                        '<div class="details">' +
                                          '<p>' + el.date + '</p>' +
                                          '<p>' + el.content + '</p>' +
                                          '<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Compartir</a></div></div>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>'
                                    );
              //mapa
              /*function myMap() {
                var pointAtMap  = new google.maps.LatLng(el.location);
                var mapProp= {
                    center:new google.maps.LatLng(el.location),
                    zoom:15,
                };
                var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
                var marker = new google.maps.Marker({
                  position: pointAtMap,
                  map: map,
                  title: 'foobar'
                });
              }*/
              $(".calendar-"+el.id).click(function(){
                  $.ajax({
                    url: 'https://dev.skynouk.com/talent/api/acceptEvent',
                    type: 'POST',
                    datatype: 'JSON',
                    data    : {'event_id' : el.id, 'facebook_id' : facebookId },
                  })
                  .done(function(res){
                    console.log(res)
                  })
                  .fail(function(res){
                    console.log("error")
                  })
              })
            })
         })
       .fail(function() {
          $(".events").empty();
       })
       .always(function() {
          console.log('error')
       });
      //Select categorias y Filtro
      $.ajax({
           url: 'http://dev.skynouk.com/talent/api/getCategories',
           type: 'GET',
           datatype: 'JSON',
       })
       .done(function(response) {
          
           response.data.categories.forEach(function(e){
              $("#sel1").append('<option value="'+ e.id +'">'+ e.name +'</option>');
              $('#sel1').on('change', function() {
                    //valor seleccionado por el usuario
                    //console.log($(this).val());
              var currentValue = $(this).val();
                    // desaparecer todos los que no son de esta categoria
                     $(".events").empty();
                    if (currentValue === e.id ) {
                         $.ajax({
                             url: 'http://dev.skynouk.com/talent/api/getEventsByCategories',
                             type: 'POST',
                             datatype: 'JSON',
                             data    : {'category_id' : e.id},
                         })
                         .done(function(response) {
                          var data = response.data.events;
                          console.log(data.length);
                          if(data.length <= 1){
                            $(".events").append('<div class="upsi"><img src="https://cdn.shopify.com/s/files/1/1061/1924/products/Sad_Face_Emoji_large.png?v=1480481055" class="img-responsive"><h1>upsi!</h1>' +
                              '<h2> Lo sentimos no hay eventos en esta categoría</h2></div>');
                          }
                          else{
                            data.forEach(function(el){
                                 $(".events").append(
      '<div class="card card-inverse card-primary mb-3 ' + el.category_id + '">'+
        '<div class="card-block">'+
          '<blockquote class="card-blockquote">'+
            '<div class="row">' +
                  
              '<div class="col-sm-12 col-xs-12 text-center">' +
                  '<h3>' + el.title + '</h3>' + 
                   '<p class="text-muted">'+ el.category_name +'</p>' + 
              '</div>' +
                 '<div class="col-sm-12 col-xs-12">' +
                  '<div class="col-sm-6 col-xs-6">' +
                 
                  '<h5>' + el.date + '</h5>' +
                  '</div>' +
                  '<div class="col-sm-6 col-xs-6">' +
                  '<button type="button" class="btn btn-info calendar-'+ el.id +'">Quiero ir</button>' +
                  '<a href="#'+ el.id +'" data-toggle="modal">Leer Mas</a>' + 
                  '</div>' +
                  '</div>' +
            
                  '<div class="col-sm-12 col-xs-12 text-center">' +
                  '<p>evaluación</p>' +
                  '</div>' +
              '</div>'+
            '</blockquote>'+
          '</div>'+
         '</div>');
                                  $(".modal-items").append(
                                  '<div class="modal fade" id="' + el.id + '">' +
                                    '<div class="modal-dialog">' +
                                      '<div >' +
                                        '<button type="button" class="btn btn-success" data-dismiss="modal">X</button>' +
                                      '</div>' +
                                      '<img src="' + el.image_url + '"class="img-responsive">' +
                                      '<div class="header-modal">' +
                                          '<h3>' + el.title + '</h3>' +
                                          '<h5>'+ el.category_name +'</h5>' +
                                          '<h6>' + el.perform_with + '</h6>' +
                                        '</div>' +
                                        '<div class="details">' +
                                          '<p>' + el.date + '</p>' +
                                          '<p>' + el.content + '</p>' +
                                          '<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Compartir</a></div></div>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>'
                                    );
                                })
                            }
                           })
                         .fail(function(response) {
                             console.log('error')
                         })
                         .always(function() {
                             console.log('complete')
                         });
                    } else {
                        $('.' + e.id).remove();
                    }
              });
           })
         })
       .fail(function() {
           console.log('error')
       })
       .always(function() {
           console.log('complete')
       });
       //Perfil usuario
         $.ajax({
          url: 'https://dev.skynouk.com/talent/api/getCalendar',
          type: 'POST',
          datatype: 'JSON',
          data    : {'facebook_id' : facebookId},
        })
        .done(function(res){
                    console.log(res.data.events);
                    res.data.events.forEach(function(el){
                                 $("#events-calendar").append(
      '<div class="card card-inverse card-primary mb-3 ' + el.category_id + '">'+
        '<div class="card-block">'+
          '<blockquote class="card-blockquote">'+
            '<div class="row">' +
                  
              '<div class="col-sm-12 col-xs-12 text-center">' +
                  '<h3>' + el.title + '</h3>' + 
                   '<p class="text-muted">'+ el.category_name +'</p>' + 
              '</div>' +
                 '<div class="col-sm-12 col-xs-12">' +
                  '<div class="col-sm-6 col-xs-6">' +
                 
                  '<h5>' + el.date + '</h5>' +
                  '</div>' +
                  '<div class="col-sm-6 col-xs-6">' +
                  '<button type="button" class="btn btn-info calendar-'+ el.id +'">Quiero ir</button>' +
                  '<a href="#'+ el.id +'" data-toggle="modal">Leer Mas</a>' + 
                  '</div>' +
                  '</div>' +
            
                  '<div class="col-sm-12 col-xs-12 text-center">' +
                  '<p>evaluación</p>' +
                  '</div>' +
              '</div>'+
            '</blockquote>'+
          '</div>'+
         '</div>');
                                  $(".modal-items").append(
                                  '<div class="modal fade" id="' + el.id + '">' +
                                    '<div class="modal-dialog">' +
                                      '<div >' +
                                        '<button type="button" class="btn btn-success" data-dismiss="modal">X</button>' +
                                      '</div>' +
                                      '<img src="' + el.image_url + '"class="img-responsive">' +
                                      '<div class="header-modal">' +
                                          '<h3>' + el.title + '</h3>' +
                                          '<h5>'+ el.category_name +'</h5>' +
                                          '<h6>' + el.perform_with + '</h6>' +
                                        '</div>' +
                                        '<div class="details">' +
                                          '<p>' + el.date + '</p>' +
                                          '<p>' + el.content + '</p>' +
                                          '<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Compartir</a></div></div>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>'
                                    );
                    })
                  })
                  .fail(function(res){
                    console.log("error")
                  })

                  $("#avatar").append(
                      '<div id="imgfb" class="col-md-6 col-sm-6 col-xs-12 text-center">'+
          '<img src="https://graph.facebook.com/' +facebook_id + '/picture?type=large" class="img-circle" alt="Profile">' +
        '</div>' +
        '<div id="avatar-name" class="col-md-6 col-sm-6 col-xs-12 text-center">' +
          '<h1>'+last_name+'</h1>'+
        '</div>'
                    );

})



