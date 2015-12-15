(function ($) {
    $(document).ready(function(){
        $(function () {
            var header = $('#first1');
            var width = $(window).width();
            console.log(width);
            var spacer22 =  $('.spacer2').offset().top;
            var spacer11 =  $('.spacer').offset().top;
            if(width > 1336) {
                var spacer2pos = -spacer22 + 350;
                var spacer1pos = spacer11 + 0;
            }
            if(width > 1600) {
                var spacer2pos = -spacer22 + 500;
                var spacer1pos = spacer11 - 300;
            }
            $(window).scroll(function () {
                var b = $(this).scrollTop();
                var c = 150 - b/5.2;
                //header.animate({opacity: '-=0.07'}, 200, 'easeInSine');
                header.height(c).queue(false);
                $('.spacer').css('background-position', '50% ' + (spacer1pos + b/2.5) + 'px');
                $('.spacer2').css('background-position', '50% ' + (spacer2pos + b/3.5) + 'px');
                if ($(this).scrollTop() > 570) {
                    header.height(150);
                    $('#first1').fadeOut(200);

                    $('#second2').fadeIn(300);
                }
                else {
                    $('#second2').fadeOut(400);
                    $('#first1').fadeIn(300);
                }
                if ($(this).scrollTop() > 200) {
                    $('.tabs').hide(400);
                }
                else{
                        $('.tabs').show(200);
                }

                //Visible things
                if($('#about').visible()){
                    $('#second2 > div > ul > li:nth-child(1)').removeClass('active');
                    $('#second2 > div > ul > li:nth-child(2)').addClass('active');
                }
                else {
                    $('#second2 > div > ul > li:nth-child(1)').addClass('active');
                    $('#second2 > div > ul > li:nth-child(2)').removeClass('active');
                }


            }).scroll();
        });
    });
}(jQuery));