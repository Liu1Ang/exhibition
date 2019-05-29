$(function() {
	/*==============swiper 初始化 ====================*/
	//main init
	var swiper = new Swiper('.main', {
		pagination: '.mainPage',
		paginationClickable: true,
		direction: 'vertical',
		mousewheelControl: true,
		keyboardControl: true,
		threshold : 150,
		onSlideChangeStart: function(swiper) {
			
		}
	});

	//swiper2 init
	var swiper2 = new Swiper('.swiper2', {
		pagination: '.swiper2Page',
		paginationClickable: true,
//		direction: 'horizontal',
		keyboardControl: true,
		/*autoplay: {
		    delay: 5000,//1秒切换一次
		},*/
	});

	/*==================banner图片及第二屏图片============================*/
	if(sessionStorage.getItem('fy_index_banner')) {
		bannerStyle(JSON.parse(sessionStorage.getItem('fy_index_banner')))
	} else {
		//发送请求
		$.get('http://www.foyuanzhilu.cn/pavilion/banner', function(data) {
			// console.log(data);
			bannerStyle(data);
			sessionStorage.setItem('fy_index_banner', JSON.stringify(data));
		});
	}

	// banner样式操作
	function bannerStyle(data) {
		//banner 图片
		$('.home').css({
			"background": "url(http://www.foyuanzhilu.cn" + data.banner + ") no-repeat center",
			"background-size": "cover"
		});
		//第二屏样式
		for(var i = 0,len = data.imgs.length-1;i < len; i++){
			$($('.swiper2 img')[i]).attr('src', 'http://www.foyuanzhilu.cn' + data.imgs[i])
		}
	}

	/*================底部弹出框=================*/
	$('.button').on('mouseover', function() {
		$('.foot_alert').css('bottom', '86px');
		$('.foot_left .button').css('border-bottom-color', '#ac011d');
	});
	$('.foot_alert').on('mouseover', function() {
		$('.foot_alert').css('bottom', '86px');
		$('.foot_left .button').css('border-bottom-color', '#ac011d');
	}).on('mouseout', function() {
		$('.foot_alert').css('bottom', '-100px');
		$('.foot_left .button').css('border-bottom-color', '#d0d0c6');
	});

});