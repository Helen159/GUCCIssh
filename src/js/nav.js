$(document).ready(function(){ 
    $(window).scroll(function(){
        if($(window).scrollTop()>50){
            // $('.navigation>.logo').css('display','none');
            $('.navigation').css('position','sticky');
            $('.navigation').css('background-color','black');
            $('.navigation').css('height',60+'px');

            $('.logo').css('display','none');
            $('.news').css('position','absolute');
            // $('.find').css('z-index',999);

            $('.navigation').mouseout(function(){
                $(this).css('background-color','black');
            });
        }else{
            // $('.navigation>.logo').css('display','block');
            $('.navigation').css('position','absolute');
            $('.navigation').css('background-color','transparent');
            $('.navigation').css('height',92+'px');
            
            $('.logo').css('display','block');
            $('.news').css('position','initial');

            $('.navigation').mouseleave(function(){
                $(this).css('background-color','transparent');
            });
        }
    })

    
})