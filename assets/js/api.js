$(document).ready(function() {

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
                  '<div class="col-sm-8 col-xs-8">' +
                  '<h3>' + el.title + '</h3>' +
                  '<div class="col-sm-4 col-xs-4">' +
                  '<p class="text-muted">'+ el.category_name +'</p>' +
                  '<p>' + el.date + '</p>' +
                  '</div>' +
                  '<div class="col-sm-4 col-xs-4">' +
                  '<button type="button" class="btn btn-info">Quiero ir</button>' +
                  '<a href="#infomodal" data-toggle="modal">Leer Mas</a>' + 
                  '</div>' +
                  '</div>' +
                  '<div class="col-sm-12 col-xs-12 text-center">' +
                  '<p>evaluación</p>' +
                  '</div>' +
                  '</div>'+
                  '</blockquote>'+
                  '</div>'+
                '</div>');
            })
         })
       .fail(function() {
          $(".events").empty();
       })
       .always(function() {
           console.log('complete')
       });




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
                          console.log(response);
                            response.data.events.forEach(function(el){          
                                 $(".events").append(
                                    '<div class="card card-inverse card-primary mb-3 ' + el.category_id + '">'+
                                      '<div class="card-block">'+
                                      '<blockquote class="card-blockquote">'+
                                      '<div class="row">' +
                                      '<div class="col-sm-8 col-xs-8">' +
                                      '<h3>' + el.title + '</h3>' +
                                      '<div class="col-sm-4 col-xs-4">' +
                                      '<p class="text-muted">'+ el.category_name +'</p>' +
                                      '<p>' + el.date + '</p>' +
                                      '</div>' +
                                      '<div class="col-sm-4 col-xs-4">' +
                                      '<button type="button" class="btn btn-info">Quiero ir</button>' +
                                      '<button type="button" class="btn btn-default">Leer Más</button>' +
                                      '</div>' +
                                      '</div>' +
                                      '<div class="col-sm-12 col-xs-12 text-center">' +
                                      '<p>evaluación</p>' +
                                      '</div>' +
                                      '</div>'+
                                      '</blockquote>'+
                                      '</div>'+
                                    '</div>');
                                })
                           })
                         .fail(function(response) {
                             /*$(".events").empty();
                             var eventsCategory = response.data.events
                             if (eventsCategory.length == 0) {
                              $(".events").append(
                                                              "<div>ups!</div>"+
                                                              "<div> Lo sentimos no hay eventos en esta categoría");
                             }*/
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
           $(".events").empty();
       })
       .always(function() {
           console.log('complete')
       });

        

})