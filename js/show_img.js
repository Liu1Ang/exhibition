$(function() {
	$.extend({
		//获取图片集    展馆图集 id=55
		get_imgs: function(newsId) {
			//                    console.log(newsId);
			/*if(sessionStorage.getItem('fy_mus_news' + newsId)) {
				addHtml(JSON.parse(sessionStorage.getItem('fy_mus_news' + newsId)));
			}*/
			$.get("http://www.foyuanzhilu.cn/pavilion/news?c=" + newsId, function(data) {
				//console.log(data);
				addHtml(data);
				sessionStorage.setItem('fy_mus_news' + newsId, JSON.stringify(data));
				//监听滚动加载数据
				var currentPage = 1;
				var pages = data.count;

				function nextPage() {
					//如果总页数为0,直接return
					if(pages == 0) {
						return;
					}
					currentPage++;
					//当前页大于总页数,显示没有更多的提示语
					if(currentPage > pages) {
						console.log('没有更多')
						return;
					}
					//如果当前页大于1,显示正在加载的提示语
					if(currentPage > 1) {
						$('#loading').show();
						console.log('正在加载...')
					}
					//进行异步请求数据
					var response = $.ajax({
						type: "get",
						url: "http://www.foyuanzhilu.cn/pavilion/news?c=" + newsId,
						data: {
							"page": currentPage
						},
						success: function(data) {
							addHtml(data);
							$('#loading').hide(0);
						},
						async: true
					});
				}
				//页面滚动时,加载函数
				$(window).scroll(function() {
					if($(window).scrollTop() >= ($('html,body')[0].clientHeight-$('.banner').height())*1.2) {
						nextPage();
					}
				});
			});

			function addHtml(data) {
				var html = '';
				$.each(data.list, function() {
					html += "<div class='white-panel'><img class='thumb' src=http://www.foyuanzhilu.cn" + this.img_url + " id=" + this.id + "></div>"
				});
				$('#gallery-wrapper').append(html);
			}

			function addHtml1(data) {
				var html = '';
				$.each(data.list, function() {
					html += "<div class='white-panel'><img class='thumb' src=http://www.foyuanzhilu.cn" + this.img_url + " id=" + this.id + "></div>"
				});
				
				$('#gallery-wrapper').append(html);
			}
		}
	});
	$.get_imgs(55);
})