$(document).ready(function() {

   $.ajax({
           url: 'http://dev.skynouk.com/talent/api/getEvents',
           type: 'GET',
           datatype: 'JSON',
       })
       .done(function(response) {
           console.log(response.data.events[0].category_name);
           response.data.events.forEach(function(el){            
              console.log(el.category_name);
             $('#sel1').append('<option value="'+ el.category_name +'">'+ el.category_name +'</option>');
           })
       })
       .fail(function() {
           console.log('error')
       })
       .always(function() {
           console.log('complete')
       });
})