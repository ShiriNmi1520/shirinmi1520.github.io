
$(document).ready(function(){
    $('.cat-list li').addClass('fnd');
    function counter_set()
    {
        $('.cat-list').each(function() {
        var cnt = $(this).children('.cat-list li.fnd').length;
      
        $(this).parent().parent().parent().find('.incat-count').text(cnt);
                                        });
    }
    
    counter_set();
    
    $('.srch').keyup(function(){
        var txt = $(this).val().toLowerCase();
        $('.cat-list li').filter(function(){
            var mt = $(this).text().toLowerCase().indexOf(txt) > -1;
            $(this).toggle(mt);
            $(this).toggleClass('fnd', mt);
        });
        counter_set();
  });
 
    
    
});