$(function() {
	$('.title-list li').click(function() {
		var liindex = $('.title-list li').index(this);
        //li对应id
        var liId = $(this).attr('id');
		$(this).addClass('on').siblings().removeClass('on');
		$('.product-wrap div.product').eq(liindex).fadeIn(150).siblings('div.product').hide();
		var liWidth = $('.title-list li').width();
		$('.lanrenzhijia .title-list p').stop(false, true).animate({
			'left': liindex * liWidth + 'px'
		}, 300);
        //馆藏图片集请求
        if(window.location.href.indexOf('mus_second') > -1) {
        	sessionStorage.setItem('fy_mus_index',liindex);
        	sessionStorage.setItem('fy_mus_id',liId);
        	if(liId != 51){
        		$.get_mus(liId);
        		//初始化瀑布流
            	init();
        	}
            
            
        }
        if(window.location.href.indexOf('mus_three') > -1) {
        	sessionStorage.setItem('fy_mus_index3',liindex);
        	sessionStorage.setItem('fy_mus_id3',liId);
            $.get_mus(liId);
            //初始化瀑布流
//          init();
        }
     //   展馆图集
		if(window.location.href.indexOf('show_Img') > -1){
            $.get_imgs(liId);
            //初始化瀑布流
            init();
		}
	});
	
	
});