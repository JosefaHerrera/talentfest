$(document).ready(function() {

   $.ajax({
           url: 'http://dev.skynouk.com/talent/api/getEvents',
           type: 'GET',
           datatype: 'JSON',
       })
       .done(function(response) {
           var categories = [];
                         var uniqueNames = [];

           response.data.events.forEach(function(el){          
              categories.push(el.category_name);
              console.log(categories);    
            })
            $.each(categories, function(i, el){
               if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
              });

              for(var i = 0; i < uniqueNames.length; i++){
                $("#sel1").append("<option value='" + uniqueNames[i] + "'>" + uniqueNames[i] + "</option>");
              }
         })
       .fail(function() {
           console.log('error')
       })
       .always(function() {
           console.log('complete')
       });
})