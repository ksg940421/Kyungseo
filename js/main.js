$(function(){

    // 만약 접속한 기기의 가로크기가 480초과라면 menu영역이 보이고, 480이하면 menu영역 숨김.
    var winwidth=$(window).width();
    if(winwidth>480) {
        // pc버전
        $('header nav').show();
    }else{
        // 모바일 버전
        $('header nav').hide();
    }
    $('.mo_menu').hide();
    $('.sitemap').hide();
    // menu_btn을 누르면 sitemap영역이 나타남
    $('.menu_btn').click(function(){
        if(winwidth>=1600){
            $('.sitemap').fadeIn();
        }else{
            $('.mo_menu').fadeIn();
        }
    });// close_Btn을 클릭하면 sitemap영역 사라짐
    $('.site_close').click(function(){
        $('.sitemap').hide();
    });
    $('.mo_close').click(function(){
        $('.mo_menu').hide();
    });

    // 모바일 mo_nav 아코디언 메뉴
    $('.mo_nav .sub').hide();
    $('.mo_nav > ul > li').click(function(){
        // 만약 클릭한 메뉴에 activ가 설정되어 있지 않다면,
        if($(this).attr('class') != 'active'){
            // .mo_nav의 모든 주메뉴에서 active클래스 제거
            $('.mo_nav > ul > li').removeClass('active'); 
            // 클릭한 메뉴만 active 클래스 추가
            $(this).addClass('active');
            // 모든 서브메뉴 숨김
            $('.mo_nav .sub').slideUp();
            // 클릭한 메뉴의 서브메뉴만 나타남
            $(this).find('.sub').slideToggle();
            // 클릭한 메뉴에 active가 설정되어 있다면
        }else{
            // 클릭한 메뉴에서 active 클래스 제거
            $(this).removeClass('active');
            // 클릭한 메뉴의 서브메뉴 숨김
            $(this).find('.sub').slideUp();
        }
    });

    // 인덱스 번호를 나타내는 변수 선언 및 초기화
    var num=0;
    // 왼쪽 이미지의 총 개수를 읽어서 total변수에 저장
    var total=$('.photo').length;
    // 왼쪽 이미지의 높이를 읽어서 imgHeight 변수에 저장
    var imgHeight=$('.photo').height();

    //만약 접속한 기기의 가로길이가 1600이상이면 양쪽 슬라이드 실행되고
    //1600미만이면 모바일 슬라이드(한쪽 슬라이드) 살행
    if(winwidth>=1600){
        //pc버전 슬라이드
        
        // 왼쪽 이미지 영역 - 첫번째 이미지가 보임
        $('.photo').css('z-index',1);
        $('.p1').css('z-index',5);
        // 가운데 이미지 영역 - 첫번째 이미지만 보임
        $('.small').hide();
        $('.small:first').show();
        // 오른쪽 글자 영역 첫번째 글자들만 보임
        $('.txt').removeClass('active').hide();
        $('.txt:first').show().addClass('active')
        // number(숫자) 영역 - 첫번째 숫자만 보임
        $('.number a').hide();
        $('.number a:first').show();


        // next_btn 클릭하면 왼쪽 이미지가 위로 올라옴
        $('.next_btn').click(function(){
            clearInterval(auto);
            auto=setInterval(movefn,7000);
            barfn();



            // 인덱스 번호를 1씩 증가시킴
            num++;
            // 이미지의 인덱스 번호가 이미지의 총개수보다 크면 0으로 초기화
            if(num>=total) {num=0;}
            $('.photo').each(function(){
                // 왼쪽 이미지의 인덱스 번호를 imgNum에 저장
                var imgNum=$(this).index();
                // 만약 num값과 imgNum값이 같다면
                if (num==imgNum) {
                    // 모든 이미지는 순서를 뒤로 함.
                    $('.photo').css('z-index',1);
                    // imgNum인덱스 번호에 해당하는 이미지 이동
                    $(this).css({'top':imgHeight,'z-index':5});
                    $(this).animate({'top':0},700,"easeOutExpo");
                    $(this).prev().css('z-index',3);
                }
            });
            // 가운데 이미지의 갯수만큼 반복
            $('.small').each(function(){
                // 가운데 이미지의 인덱스번호를 centerNum 번호에 저장
                var centerNum=$(this).index();
                // 만약 num값과 centerNum값이 같다면
                if(num==centerNum){
                    // 모든 가운데 이미지 안보임
                    $('.small').fadeOut();
                    $(this).fadeIn();
                }
            });
            // number(숫자)의 개수만큼 반복
            $('.number a').each(function(){
                // 숫자 a(태그)의 인덱스번호를 aNum 변수에 저장
                var aNum=$(this).index();
                // 만약 num과 aNum과 값이 같다면
                if(num==aNum){
                    // 모든 숫자 안보임
                    $('.number a').hide();
                    // 현재 숫자만 보임
                    $(this).show();
                }
            });
            // text영역 글자 애니메이션
            $('.txt').each(function(){
                // 인덱스 영역의 인덱스 번호를 txtNum변수에 저장
                var txtNum=$(this).index();
                if(num==txtNum){
                    $('.txt').removeClass('active').hide();
                    $(this).show().addClass('active');
                }
            });
        });
        //PREV버튼을 클릭하면 왼쪽 이미지가 위로 올라옴
        $('.prev_btn').click(function(){
            clearInterval(auto);
            auto=setInterval(movefn,7000);
            barfn();
            
            //이미지의 인덱스 번호를 1씩 감소시킴
            num--;
            //이미지의 인덱스 번호가 0보다 작으면 total-1로 초기화
            if(num<0) { num=total-1; }
            //왼쪽 이미지의 개수만큼 반복
            $('.photo').each(function(){
                //왼쪽 이미지의 인덱스번호를 imgNum변수에 저장
                var imgNum=$(this).index();
                //만약 num값과 imgNum값이 같다면
                if(num==imgNum){
                    //모든 이미지는 순서를 뒤로 함.
                    //imgNum 인덱스 번호에 해당하는 이미지 이동
                    $('.photo').css('z-index',1);
                    $(this).next().css('z-index',3)
                    $(this).css({'top':-imgHeight, 'z-index':5});
                    $(this).animate({'top':0},700,"easeOutExpo");
                }
            });
            // 가운데 이미지의 갯수만큼 반복
            $('.small').each(function(){
                // 가운데 이미지의인덱스번호를 centerNum 번호에 저장
                var centerNum=$(this).index();
                // 만약 num값과 centerNum값이 같다면
                if(num==centerNum){
                    // 모든 가운데 이미지 안보임
                    $('.small').fadeOut();
                    $(this).fadeIn();
                }
            });
            
            // number(숫자)의 개수만큼 반복
            $('.number a').each(function(){
                // 숫자 a(태그)의 인덱스번호를 aNum 변수에 저장
                var aNum=$(this).index();
                // 만약 num과 aNum과 값이 같다면
                if(num==aNum){
                    // 모든 숫자 안보임
                    $('.number a').hide();
                    // 현재 숫자만 보임
                    $(this).show();
                }
            });
            
            // text영역 글자 애니메이션
            $('.txt').each(function(){
                // 인덱스 영역의 인덱스 번호를 txtNum변수에 저장
                var txtNum=$(this).index();
                if(num==txtNum){
                    $('.txt').removeClass('active').hide();
                    $(this).show().addClass('active');
                }
            });
        });
        // 자동으로 슬라이드 넘기기
        var auto=setInterval(movefn, 7000);
        // 함수 선언
        function movefn(){
            $('.next_btn').trigger('click');
            barfn();
        }
        // 함수 선언
        function barfn(){
            $('.bar').stop();
            $('.bar').css('width',0);
            // slide_Bar 안의 자식 객체 bar의 가로길이 길어짐
            $('.bar').animate({'width':'100%'},6900, function(){
                $('.bar').css('width',0);
            });
        }
        // 함수 호출
        barfn();
        // box역역(.box_hover에 마우스 오버했을 때 .box_move가 살짝 이동함)
        $('.box_hover').mouseover(function(){
            // 0~50무작위 수 발생
            var x=Math.ceil(Math.random()*30);
            var y=Math.ceil(Math.random()*30);
            $(this).find('.box_move').stop().animate({'left':x,'top':y},1000);
        });
        // .box_btn을 클릭하면 오른쪽 3개의 이미자가 이동함
        var sw=0;
        // .box ul의 길이 /2한 값을 ulMove변수에 저장
        var ulMove=Math.ceil($('.box ul').width()/2);
        $('.box_btn').click(function(e){
            e.preventDefault();
            // if 만약 sw값이 0이면
            if(sw==0){
                sw=1;
                $('.box_btn').css('background-position','right center');
                $('.box ul').stop().animate({left:-ulMove},700,'easeInOutExpo');
            }else{
                sw=0;
                $('.box_btn').css('background-position','left center');
                $('.box ul').stop().animate({left:0},700,'easeInOutExpo');
            }
        });
        // fullpage
        $('#fullpage').fullpage({
            // fullpage의 동그란 메뉴 사용
            navigation:true,
            // fullpage의 동그란 메뉴 위치를 화면 왼쪽으로 설정
            navigationPosition:'left',
            // fullpage의 동그란 메뉴에 메뉴 이름 설정
            navigationTooltips:['MAIN','PRODUCT','COMMUNITY','DEAL'],
            // fullpage의 동그란 메뉴의 이름을 사용
            showActiveTooltip:true,

            // fullpage 내용을 불러온 다음 function안의 명령어 실행
            // 매개변수(anchorLink:메뉴랑 section연동, index:section의 인덱스 번호, direction:화면이 이동하는 방향)
            afterLoad:function(anchorLink,index,direction){
                // 2번째 section이거나 4번째 section 일때,( ||(논리연산자) :  또는)
                if(index==2 || index==4){
                    // 네비게이션의 주메뉴에 active설정
                    $('header').addClass('active');
                }
                // 1번째 section이거나 3번째 section 일때,( ||(논리연산자) :  또는)
                if(index==1 || index==3){
                    // 네비게이션의 주메뉴에 active제거
                    $('header').removeClass('active');
                }
            },
            // section이 이동할 때 function 다음의 명령어 실행
            // 매개변수(index:section의 번호, nextIndex:다음 section을 가르킴, direction:화면이 이동하는 방향)
            onLeave:function(index, nextIndex, direction){
                // 만약 section의 인덱스번호가 4, 다음 section의 번호가 5이면(section4에서 아래로 이동할 때)
                if(index=4 && nextIndex==5){
                    // header의 영역 사라짐
                    $('header').fadeOut();
                    // 그렇지 않을 경우,
                }else{
                    // header의 영역 보여짐
                    $('header').fadeIn();
                }
            }
        });
    }else{
            //태블릿, 모바일버전 슬라이드
            // photo의 인덱스 번호를 나타내는 변수
            var mo_num=0;
            // photo의 총 개수를 mo_total  변수에 저장
            var mo_total=$('.photo').length;
            // photo의 가로길이를 imgWidth 변수에 저장
            var imgWidth=$('.photo').width();
            // 모든 photo 보임
            $('.photo').show();
            $('.small').show();
            // 모든 center_img 안의 small도 보임
            // 마지막 photo이미지를 첫번째 photo이미지의 왼쪽에 배치
            $('.photo:last-child').prependTo('.left_img');

            // 마지막 small이미지를 첫번째 small 이미지의 왼 쪽에 배치
            $('.small:last-child').prependTo('.center_img');

            // .left_img 의 left값을 photo의 가로길이만큼 왼쪽으로 이동
            $('.left_img').css('left',-imgWidth);

            // .center_img의 left 값을 photo의 가로길이 만큼 왼쪽으로 이동시킴
            $('.center_img').css('left',-imgWidth);
            // .number a 중 첫번째 a에 active 설정
            $('.number a:first-child').addClass('active');
            // .right_txt의 txt객체 중 첫번째 txt에 active클래스 설정
            $('.right_txt .txt:first-child').addClass('active');


            // prev_btn에 클릭이벤트 설정
            $('.prev_btn').click(function(){
                // 이미지의 인덱스번호를 1씩 감소시킴
                mo_num--;
                // 만약 인덱스번호가 mo_tota0값 미만이면 total-1으로 초기화
                if(mo_num <0){mo_num=mo_total-1;}
                // mo_num에 해당하지 않는 number a는 active 클래스 제거
                // :not()메서드는 ()안의 조건의 반대가 되는 객체 선택자
                $('.number a:not(:eq(mo_num))').removeClass('active');
                // mo_num에 해당하는 number에는 active 클래스 설정
                $('.number a').eq(mo_num).addClass('active');
                // mo_num에 해당하지 않는 .txt는 active 클래스 제거
                $('.txt:not(:eq(mo_num))').removeClass('active');
                // mo_num에 해당하는 .txt에 active 클래스 설정
                $('.right_txt .txt').eq(mo_num).addClass('active');






                // '-='+imgWidth ==> 오른쪽으로 photo 가로길이만큼 이동
                $('.left_img').animate({left:'+='+imgWidth},700,'easeOutExpo',
                function(){
                    // .left_img영역이 이동하고 난 후 첫번째 photo가 .left_img영역의 맨 앞으로 삽입됨.
                    $('.photo:last-child').prependTo('.left_img');
                    $('.left_img').css('left',-imgWidth);
                });
                $('.center_img').animate({left:'+='+imgWidth},700,'easeOutExpo',
                function(){
                    // .left_img영역이 이동하고 난 후 첫번째 small이 .center_img영역의 맨 앞으로 삽입됨.
                    $('.small:last-child').prependTo('.center_img');
                    $('.center_img').css('left',-imgWidth);
                });
            }); //next_btn
            // next_btn에 클릭이벤트 설정
            $('.next_btn').click(function(){
                // 이미지의 인덱스번호를 1씩 증가시킴
                mo_num++;
                // 만약 인덱스번호가 mo_total값 이상이면 0으로 초기화
                if(mo_num >= mo_total){mo_num=0;}
                // mo_num에 해당하지 않는 number a는 active 클래스 제거
                $('.number a').eq(mo_num-1).removeClass('active');
                // mo_num에 해당하는 number에는 active 클래스 설정
                $('.number a').eq(mo_num).addClass('active');
                // mo_num에 해당하지 않는 .txt는 active 클래스 제거
                $('.right_txt .txt').eq(mo_num-1).removeClass('active');
                // mo_num에 해당하는 .txt에 active 클래스 설정
                $('.right_txt .txt').eq(mo_num).addClass('active');






                // '-='+imgWidth ==> 왼쪽으로 photo 가로길이만큼 이동
                $('.left_img').animate({left:'-='+imgWidth},700,'easeOutExpo',
                function(){
                    // .left_img영역이 이동하고 난 후 첫번째 photo가 .left_img
                    $('.photo:first-child').appendTo('.left_img');
                    $('.left_img').css('left',-imgWidth);
                });
                $('.center_img').animate({left:'-='+imgWidth},700,'easeOutExpo',
                function(){
                    // .left_img영역이 이동하고 난 후 첫번째 photo가 .left_img
                    $('.small:first-child').appendTo('.center_img');
                    $('.center_img').css('left',-imgWidth);
                });
            }); //prev_btn
            // mo_box 슬라이드
            // outWidth()메서드는 padding, margin값 포함한 가로길이 구함
            var mo_width=$('.mo_box ul li').outerWidth();
            $('.mo_box ul li:last-child').prependTo('.mo_box ul');
            $('.mo_box ul').css('left',-mo_width);

            // 배열 선언
            var startX={};
            var endX={};
            $('.mo_box ul').on({
                // .mo_box ul 객체에 touchstart이벤트 설정,e:이벤트를 전달하는 변수
                'touchstart':function(e){
                    // e.touches[0] : 터치 이벤트가 발생한 객체
                    // pageX:가로 스크롤을 포함한 브라우저 화면을 기준으로 한 x좌표
                    startX=e.touches[0].pageX;
                },
                // .mo_box ul 객체에 touchmove 이벤트 설정
                'touchmove':function(e){
                    // touch 움직임이 끝난 지점의 x좌표값을 endX배열에 저장
                    endX=e.touches[0].pageX;
                    // touch한 시작x좌표에서 움직임이 끝난 x좌표값을 빼서 fnX에 저장
                    var fnX=startX-endX;
                    // 만약 fnX값이 0보다 크면(왼쪽 방향)
                    if(fnX>0){
                        $('.mo_box ul').stop().animate({'left':'-='+mo_width}, 700, 'easeOutExpo', function(){
                            $('.mo_box ul li:first-child').appendTo('.mo_box ul');
                            $('.mo_box ul').css('left',-mo_width);
                        });
                    //fnX값이 0보다 크지 않다면(작거나 같다면, 오른쪽 방향) 
                    }else{
                        $('.mo_box ul').stop().animate({'left':'+='+mo_width}, 700, 'easeOutExpo', function(){
                            $('.mo_box ul li:last-child').prependTo('.mo_box ul');
                            $('.mo_box ul').css('left',-mo_width);
                        });
                    }
                }
            });
        }
});