var animate_speed = 150;

var cookie = new Object({
    create: function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    },
    read: function(name) {
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    erase: function(namename, value, days) {
        cookie.create(name, "", -1);
    }
});

$(document).ready(function() {
        $(".fancybox").fancybox({
            openEffect      :       'elastic',
            closeEffect     :       'elastic',
            scrolling       :       'no',
            scrollOutside   :       true,
            helpers:  {
                title       :       {
                    type    :       'inside'
                },
                overlay: {
                    locked: false
                }
            }
        });
        
        if( cookie.read("enter") !== 'done' ){
            
            $("#header, #footer").addClass('enter');
            
            $("#body .content").hide();
            $("#menu li").css({opacity:0.0,left:100});

            $("#header h1").each(function(i){
                $(this).css({opacity:0,left:-100}).delay(250*i).animate({opacity:1,left:0},650).queue(function(next){
                    var menu_count = parseInt( $("#menu li").length );
                    console.log( menu_count );
                    $("#menu li").css({opacity:0.0,left:100}).each(function(i){
                        $(this).css({opacity:0,left:100}).delay(250*i).animate({opacity:1,left:0},650).queue(function(next){
                        });

                        console.log( "menu_count - 1 : " + parseInt( menu_count - 1 ) );
                        console.log( "i :              " + i );

                        if( ( parseInt( menu_count - 1 ) ) === i ){
                            console.log('yup!');
                            $("#header,#footer").delay(animate_speed * 10).animate({
                                height      :       60
                            },animate_speed * 2,function(){
                                $(this).removeClass('enter');
                                $("#body .content").fadeIn(animate_speed * 4);
                            });
                        }

                    });
                });
            });
            
            cookie.create('enter','done');
        
        }
        
        $("#menu a").hover(function(e){
            var $element_left = "menu_arrow_" + $(this).attr('data-name') + "_left";
            var $element_right = "menu_arrow_" + $(this).attr('data-name') + "_right";
            var $this = $(this);
            
            $("body").append("<div id='" + $element_left + "' class='menu_arrow left_arrow'></div>");
            $("body").append("<div id='" + $element_right + "' class='menu_arrow right_arrow'></div>");
            
            $( '#' + $element_left  ).css({
                top         :   function(){
                    return $this.offset().top;
                },
                left        :   function(){
                    return parseInt( $this.offset().left - 49);
                }
            }).animate({
                left        :   '+=22px',
                opacity     :   1.0,
                fill        :   "rgb(0,157,224)"
            },animate_speed);
            
            $( '#' + $element_right  ).css({
                top         :   function(){
                    return $this.offset().top;
                },
                left        :   function(){
                    return parseInt( $this.offset().left + $this.width() + 37);
                }
            }).animate({
                left        :   '-=22px',
                opacity     :   1.0,
                fill        :   "rgb(0,157,224)"
            },animate_speed);
            
        }, function(e){
            var $element_left = "menu_arrow_" + $(this).attr('data-name') + "_left";
            var $element_right = "menu_arrow_" + $(this).attr('data-name') + "_right";
            
            $( '#' + $element_left  ).animate({
                left        :   '-=22px',
                opacity     :   0.0
            },animate_speed,function(){
                $( '#' + $element_left ).remove();
            });
            
            $( '#' + $element_right  ).animate({
                left        :   '+=22px',
                opacity     :   0.0
            },animate_speed,function(){
                $( '#' + $element_right ).remove();
            });
        });
        
        $(".gallery a").each(function(){
            
            $this = $(this);
            
            $(this).append("<div class='infobar'>" + $(this).attr('title') + "</div>");
            $(this).append("<div class='infobar_footer'></div>");
            
            $(this).append("<div class='infobar_zoom_arrow_ul'></div>");
            $(this).append("<div class='infobar_zoom_arrow_ur'></div>");
            $(this).append("<div class='infobar_zoom_arrow_bl'></div>");
            $(this).append("<div class='infobar_zoom_arrow_br'></div>");
            
            $(this).append("<div class='infobar_img_zoom'></div>").find('.infobar_img_zoom').css({
                position                    :       'absolute',
                top                         :       0,
                left                        :       0,
                display                     :       'block',
                height                      :       '100%',
                width                       :       '100%',
                'background-image'          :       function(){
                    return 'url(' + $this.find('img').prop('src') + ')';
                },
                'background-size'           :       '100% 100%',
                'background-repeat'         :       'no-repeat',
                opacity                     :       0,
                'background-position'       :       'center',
                'z-index'                   :       1
            });
        });
        
        $(".gallery a").hover(function(){
            
            $(this).find('.infobar').animate({
                top     :       '+=25px'
            },animate_speed);
            
            $(this).find('.infobar_footer').animate({
                bottom     :       '+=25px'
            },animate_speed);
            
            $(this).find('.infobar_zoom_arrow_ul').animate({
                top     :       '-=10px',
                left    :       '-=10px',
                opacity :       1
            },animate_speed);
            
            $(this).find('.infobar_zoom_arrow_ur').animate({
                top     :       '-=10px',
                right   :       '-=10px',
                opacity :       1
            },animate_speed);
            
            $(this).find('.infobar_zoom_arrow_bl').animate({
                bottom  :       '-=10px',
                left    :       '-=10px',
                opacity :       1
            },animate_speed);
            
            $(this).find('.infobar_zoom_arrow_br').animate({
                bottom  :       '-=10px',
                right   :       '-=10px',
                opacity :       1
            },animate_speed);
            
        },function(){
            
            $(this).find('.infobar').animate({
                top     :       '-=25px'
            },animate_speed);
            
            $(this).find('.infobar_footer').animate({
                bottom     :       '-=25px'
            },animate_speed);
            
            $(this).find('.infobar_zoom_arrow_ul').animate({
                top     :       '+=10px',
                left    :       '+=10px',
                opacity :       0
            },animate_speed);
            
            $(this).find('.infobar_zoom_arrow_ur').animate({
                top     :       '+=10px',
                right   :       '+=10px',
                opacity :       0
            },animate_speed);
            
            $(this).find('.infobar_zoom_arrow_bl').animate({
                bottom  :       '+=10px',
                left    :       '+=10px',
                opacity :       0
            },animate_speed);
            
            $(this).find('.infobar_zoom_arrow_br').animate({
                bottom  :       '+=10px',
                right   :       '+=10px',
                opacity :       0
            },animate_speed);
            
        });
});