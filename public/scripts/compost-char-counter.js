   $(document).ready(function() {

       $('textarea').keyup(function() {
           var left = 140 - $(this).val().length;

           $('.counter').text(left);

           if (left < 0) {
               $('.counter').css('color', 'red');
           } else {
               $('.counter').css('color', 'black');
           }
       });
   });