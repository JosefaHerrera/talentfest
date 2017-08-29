$(document).ready(function() {

   $.ajax({
           url: 'http://dev.skynouk.com/talent/api/getEvents',
           type: 'GET',
           datatype: 'JSON',
       })
       .done(function(response) {
          var categories = [];
          var uniqueCategory = [];
          console.log(response);
           response.data.events.forEach(function(el){          
              categories.push(el.category_name);
              $(".events").append('<div class="' + el.category_name + '"><h1>' + el.title + '</h1><p>' + el.category_name + '</p></div>');


               $('#sel1').on('change', function() {
                    //valor seleccionado por el usuario
                    //console.log($(this).val());
                    var currentValue = $(this).val();
                    // desaparecer todos los que no son de esta categoria
                    if (currentValue === el.category_name ) {
                        console.log(el.category_name);
                        $('.' + el.category_name).show();

                    } else {
                        $('.' + el.category_name).hide();
                    }
                });
            })
           //Filtro select para que no se repitan las categorias
            $.each(categories, function(i, el){
              if($.inArray(el, uniqueCategory) === -1) uniqueCategory.push(el);
              });

              for(var i = 0; i < uniqueCategory.length; i++){
                $("#sel1").append("<option value='" + uniqueCategory[i] + "'>" + uniqueCategory[i] + "</option>");
              }


         })
       .fail(function() {
           console.log('error')
       })
       .always(function() {
           console.log('complete')
       });
})