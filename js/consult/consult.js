$(function() {
	$.get('http://www.foyuanzhilu.cn/pavilion/news', {
			page: 1
		},
		function(data) {
			// console.log(data)
			pages(data.count);
			dynamicHtml(data)
		});

	// 分页
	function pages(data) {
		$(".page_div").paging({
			pageNum: 1, // 当前页面
			totalNum: data, // 总页码
			totalList: 300, // 记录总数量
			callback: function(page) { //回调函数
				$.get('http://www.foyuanzhilu.cn/pavilion/news', {
						page: page
					},
					function(data) {
						// console.log(data)
						dynamicHtml(data)
					});
			}
		});
	}

	//文章列表请求
	function dynamicHtml(data) {
		// console.log(data);
		//时间戳转换
		Date.prototype.toMonth = function() {
			return(this.getMonth() + 1);
		};
		Date.prototype.toDate = function() {
			if(this.getDate() < 10) {
				return '0' + this.getDate();
			}
			return this.getDate();
		};

		//列表结构
		var dynamic_list = data.list;
		var dy_list_html = '';
		//遍历文章数据
		$.each(dynamic_list, function(index, item) {
			// console.log(item);
			var created = item.created_at;
			var unixTimestamp = new Date(created * 1000);
			var Month = unixTimestamp.toMonth();
			var Day = unixTimestamp.toDate();
			dy_list_html += '<li id="' + item.id + '">' +
				'<time><span>' + Day + '</span>/' + Month + '月</time>' +
				'<p class="ellipsis">' + item.title + '</p>' +
				'</li>'
		});
		$('.news_list').html(dy_list_html);
		list_get();
	}

	/*=========== 文章详情请求 ========*/
	function list_get() {
		//动态列表点击时显示详情页
		$('.news_list li').on('click', function() {
			var list_id = $(this).attr('id');
			// console.log(list_id);
			//时间戳
			Date.prototype.totime = function() {
				return this.getFullYear() + '年' + (this.getMonth() + 1) + '月' + this.getDate() + '日  '
			};

			//文章详情请求
			$.get('http://www.foyuanzhilu.cn/pavilion/news-detail?id=' + list_id, function(data) {
				// console.log(data);
				//结构
				var cre_time = new Date(data.created_at * 1000);
				var times = cre_time.totime();
				var list_html = '<div><h2>' + data.title + '</h2>' +
					'<p>时间：<time>' + times + '</time><span>&nbsp;浏览次数：' + data.view_count + '</span></p>' +
					'<article>' + data.content + '</article></div>';
				$('#list_xq').html(list_html);
			});
			//样式转换
			$('.dy_show').css('display', 'none');
			$('.list_xq').css('display', 'block');
			//点击分页 li 时，再显示列表
			$('.title-list li').on('click', function() {
				$('.dy_show').css('display', 'block');
				$('.list_xq').css('display', 'none');
			})
		});
	}
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
            scrollTop:700,
        },500)
	});

});