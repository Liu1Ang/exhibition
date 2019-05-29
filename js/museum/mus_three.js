$(function () {
	$('html,body').animate({
		scrollTop:600
	},500);
    //选项卡显示对应选项
    var index = sessionStorage.getItem('fy_mus_index3')?sessionStorage.getItem('fy_mus_index3'):0;
    if(index) {
        $('.title-list li').eq(index).attr('class', 'tabs_one center on').siblings().attr('class', 'tabs_one center');
        $('.product-wrap div.product').eq(index).fadeIn(150).siblings('div.product').hide();
    }
    var liWidth = $('.title-list li').width();
    $('.lanrenzhijia .title-list p').stop(false, true).animate({
        'left': index * liWidth + 'px'
    }, 300);
    var newsId = sessionStorage.getItem('fy_mus_id3')?sessionStorage.getItem('fy_mus_id3'):61;
    var num = 0;  //提示esc退出
    var scrolltop = 0;
    
    //方法扩展
    $.extend({
        //获取图片集    珍藏瑰宝 id=51  书画 id=52  工艺品 id=53  名家字画 id=54
        get_mus:function (newsId) {
            if(sessionStorage.getItem('fy_mus_news'+newsId)){
                addHtml(JSON.parse(sessionStorage.getItem('fy_mus_news'+newsId)));
            }
            $.get("http://www.foyuanzhilu.cn/pavilion/news?c="+newsId, function(data) {
                addHtml(data);
                sessionStorage.setItem('fy_mus_news'+newsId,JSON.stringify(data));
                //监听滚动加载数据
                var currentPage = 1;
				var pages = data.count;
                function nextPage(){
					//如果总页数为0,直接return
					if (pages == 0)	{
						return;
					}
					currentPage++;
					//当前页大于总页数,显示没有更多的提示语
					if(currentPage>pages){
//						console.log('没有更多')
						return;
					}
					//如果当前页大于1,显示正在加载的提示语
					if(currentPage>1){
						 $('#loading').show();
//						console.log('正在加载...')
					}
					//进行异步请求数据
					var response = $.ajax({
						type: "get",
						url: "http://www.foyuanzhilu.cn/pavilion/news?c="+newsId,
						data: {
							"page" : currentPage
						},
						success: function(data){
							addHtml1(data);
							$('#loading').hide(0);
						},
						async: true
					});
				}
                
				//页面滚动时,加载函数
				$(window).scroll(function(){
					if ($(window).scrollTop() >= ($('html,body')[0].clientHeight-$('.banner').height())*1.2) { 
						nextPage();
					} 
				}); 
				                
            });
            


            function addHtml(data) {
                var html = '';
                var html_list = '';//弹框列表
                $.each(data.list, function() {
//              	console.log(this)
                    html += "<li><a><img src=http://www.foyuanzhilu.cn" + this.img_url + " id="+ this.id +"></a></li>";
                    html_list += '<li id='+ this.id +'><h3>'+ this.title +'</h3>' +
                        '<p>浏览次数：<span class="img_number">'+ this.view_count +'</span>次</p>' +
                        /*'<i><img class="img_img" src=http://www.foyuanzhilu.cn'+ this.img_url +' alt='+ this.title +'></i>' +*/
                        '<p class="img_text">' + this.content + '</p></li>'
                });
                if(newsId == 61){
                    $('#grid').html(html);
                }else if(newsId == 62){
                    $('#grid1').html(html);
                }else{
                	$('#grid2').html(html);
                }
                $('#img_ul').html(html_list);
                //初始化瀑布流
//              init();
                //图片详情
                $.img_details()
            }
            function addHtml1(data) {
                var html = '';
                var html_list = '';//弹框列表
                $.each(data.list, function() {
//              	console.log(this)
                    html += "<li><a><img src=http://www.foyuanzhilu.cn" + this.img_url + " id="+ this.id +"></a></li>";
                    html_list += '<li id='+ this.id +'><h3>'+ this.title +'</h3>' +
                        '<p>浏览次数：<span class="img_number">'+ this.view_count +'</span>次</p>' +
                        '<p class="img_text">' + this.content + '</p></li>'
                });
                if(newsId == 61){
                    $('#grid').append(html);
                }else if(newsId == 62){
                    $('#grid1').append(html);
                }else{
                	 $('#grid2').append(html);
                }
                $('#img_ul').append(html_list);
                //初始化瀑布流
//              init();
                //图片详情
                $.img_details()
            }
        },
        
        // 图片点击详情
        img_details:function () {
            $('#product-wrap img').on('click',function () {
            	$('body').css('overflow','hidden');
                $('.img_alert').css('transform','scale(1)');
                var img_id = $(this).attr('id');
                scrolltop=$(this).offset().top;
               var curr_index = 0;
                $.each($('#img_ul li'), function(index,item) {
                	if($(item).attr('id') == img_id){
                		curr_index = index;
                	}
                });
                var ul_width = $('#img_ul li').length * $('#img_box').width();
                $('#img_ul li').width($('#img_box').width());
                $('#img_ul').width(ul_width);
                var left = $('#img_box').width()*curr_index
                $('#img_ul').css('left',-left+'px');
                num++;
                if(num <= 1){
                	$('.alert2').show().delay(2000).hide(0)
                }
                
                //上一页
                $('#img_left')[0].onclick=function(){
                	curr_index--;
                	if(curr_index < 0){
                		curr_index = 0;
                		$('.alert').show().delay(2000).hide(0)
                	}
                	left = $('#img_box').width()*curr_index;
                	$('#img_ul').css('left',-left+'px');
                }
                //下一页
                $('#img_right')[0].onclick=function(){
                	curr_index++;
                	if(curr_index > $('#img_ul li').length-1){
                		curr_index = $('#img_ul li').length-1;
                		// 已经是最后一张
                		$('.alert1').show().delay(2000).hide(0);
                	}
                	left = $('#img_box').width()*curr_index;
                	$('#img_ul').css('left',-left+'px');
                }
            });
            
        }
    });
    $.get_mus(newsId);
    
    $(document).on('keydown',function (e) {
        // console.log(e);
        if(e.keyCode === 27 || e.which === 27){
			$('body').css('overflow','auto');
            $('.img_alert').css('transform','scale(0)');
        }
    });
    //背景关闭
    $('.img_alert').on('click',function(){
    	$('body').css('overflow','auto');
        $('.img_alert').css('transform','scale(0)');
    })
    $('#img_int').on('click',function(e){
    	e.stopPropagation();
    })
    //返回顶部
	$(window).on('scroll',function(){
		var top = $(document).scrollTop();
		if(top > $(window).height()){
			$('.scrolltop').fadeIn()
		}else{
			$('.scrolltop').fadeOut(0)
		}
	})
	$('.scrolltop').on('click',function(){
		$('html,body').animate({
            scrollTop:600,
        },300)
	});
});