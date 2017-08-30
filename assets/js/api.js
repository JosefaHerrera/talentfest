$(document).ready(function() {
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
                  '<div class="col-sm-8 col-xs-8">' +
                  '<h3>' + el.title + '</h3>' +
                  '<div class="col-sm-4 col-xs-4">' +
                  '<p class="text-muted">'+ el.category_name +'</p>' +
                  '<p>' + el.date + '</p>' +
                  '</div>' +
                  '<div class="col-sm-4 col-xs-4">' +
                  '<button type="button" class="btn btn-info">Quiero ir</button>' +
                  '<a href="#'+el.id +'" data-toggle="modal">Leer Mas</a>' + 
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
                '<div class="modal fade col-sm-12 col-xs-12 text-right" id="' + el.id + '">' +
                  '<div class="modal-dialog">' +
                    '<div class"container">' +
                    '<div class="col-sm-12 col-xs-12 text-rigt">' +
                      '<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>' +
                    '</div>' +
                    '<div class="header-modal">' +
                        '<img src="' + el.image_url + '" class="img-responsive">' +
                        '<h3>' + el.title + '</h3>' +
                        '<p>'+ el.category_name +'</p>' +
                      '</div>' + 
                      '<div class="details">' +
                        '<p>' + el.date + '</p>' +
                        '<p>' + el.content + '</p>' +
                        '<p>' + el.perform_with + '</p>' +
                      '</div>' +
                    '</div>' +
                    '</div>' +
                  '</div>'
                  );
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
                            $(".events").append('<div><h1>upsi!</h1>' +
                              '<h2> Lo sentimos no hay eventos en esta categoría</h2></div>');
                          }
                          else{
                            data.forEach(function(el){
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
                                    '<a href="#'+el.id +'" data-toggle="modal">Leer Mas</a>' + 
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
                                  '<div class="modal fade col-sm-12 col-xs-12 text-right" id="' + el.id + '">' +
                                    '<div class="modal-dialog container">' +
                                      '<div class="col-sm-12 col-xs-12 text-rigt">' +
                                        '<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>' +
                                      '</div>' +
                                      '<div class="header-modal">' +
                                          '<img src="' + el.image_url + '">' +
                                          '<h3>' + el.title + '</h3>' +
                                          '<p>'+ el.category_name +'</p>' +
                                        '</div>' + 
                                        '<div class="details">' +
                                          '<p>' + el.date + '</p>' +
                                          '<p>' + el.content + '</p>' +
                                          '<p>' + el.perform_with + '</p>' +
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

        

})