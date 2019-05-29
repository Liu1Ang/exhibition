$(function() {
	$.get('http://www.foyuanzhilu.cn/pavilion/activity?type=1', {
			page: 1
		},
		function(data) {
			// console.log(data);
			old_pages(data.count);
			activity_list(data, '1');
		});
	$.get('http://www.foyuanzhilu.cn/pavilion/activity?type=0', {
			page: 1
		},
		function(data) {
			// console.log(data);
			new_pages(data.count);
			activity_list(data, '0');
		});

	// 分页
	function old_pages(data) {
		$("#old_pageTest").paging({
			pageNum: 1, // 当前页面
			totalNum: data, // 总页码
			totalList: 300, // 记录总数量
			callback: function(page) { //回调函数
				$.get('http://www.foyuanzhilu.cn/pavilion/activity?type=1', {
						page: page
					},
					function(data) {
						activity_list(data, '1');
					})
			}
		});

	}

	function new_pages(data) {
		$("#new_pageTest").paging({
			pageNum: 1, // 当前页面
			totalNum: data, // 总页码
			totalList: 300, // 记录总数量
			callback: function(page) { //回调函数
				$.get('http://www.foyuanzhilu.cn/pavilion/activity?type=0', {
						page: page
					},
					function(data) {
						activity_list(data, '0');
					})
			}
		});
	}

	// 活动文章列表
	function activity_list(data, type) {
		//时间小于10加0
		$.extend({
			Time_add: function(time) {
				if(time < 10) {
					return time = '0' + time
				} else {
					return time = time
				}
			}
		});
		//时间戳转换
		Date.prototype.toStartTime = function() {
			var wook = '';
			switch(this.getDay()) {
				case 0:
					wook = '星期日';
					break;
				case 1:
					wook = '星期一';
					break;
				case 2:
					wook = '星期二';
					break;
				case 3:
					wook = '星期三';
					break;
				case 4:
					wook = '星期四';
					break;
				case 5:
					wook = '星期五';
					break;
				case 6:
					wook = '星期六';
					break;
			}
			return this.getFullYear() + '年' + (this.getMonth() + 1) + '月' + this.getDate() + '日(' + wook + ')' + ' ' + $.Time_add(this.getHours()) + ':' + $.Time_add(this.getMinutes())
		};
		Date.prototype.toEndTime = function() {
			return $.Time_add(this.getHours()) + ':' + $.Time_add(this.getMinutes())
		};
		Date.prototype.toTime = function() {
			return this.getFullYear() + '-' + $.Time_add((this.getMonth() + 1)) + '-' + $.Time_add(this.getDate()) + '  ' + $.Time_add(this.getHours()) + ':' + $.Time_add(this.getMinutes())
		};

		//文章结构
		var old_list_html = '';
		var new_list_html = '';
		$.each(data.list, function(index, item) {
			// console.log(item);
			//获取当前时间
			var getNewDate = parseInt(new Date().getTime() / 1000);
			//时间戳转换
			var end_times = item.apply_end_time;
			var start_time = new Date(item.start_time * 1000);
			var start = start_time.toStartTime();
			var end_time = new Date(item.end_time * 1000);
			var end = end_time.toEndTime();
			var apply_start_time = new Date(item.apply_start_time * 1000);
			var apply_start = apply_start_time.toTime();
			var apply_end_time = new Date(item.apply_end_time * 1000);
			var apply_end = apply_end_time.toTime();
			//当前时间与活动结束时间比较
			var time_html = '';
			if(getNewDate > end_times) {
				time_html = '<p class="activity_people" style="opacity: 0">已预约<span class="number">100</span>人&nbsp;&nbsp;<span class="inIng">正在预约</span></p>' +
					'<a class="aActive">预约已结束</a>'
			} else {
				time_html = '<p class="activity_people">已预约<span class="number">100</span>人&nbsp;&nbsp;<span class="inIng">正在预约</span></p>' +
					'<a href="../pages/activity/act_second.html?type=0?id=' + item.id + '">正在预约</a>'
			}
			//结构
			if(type == 1) {
				old_list_html += '<li id=' + item.id + '>' +
					'<i>' +
					'<img src=http://www.foyuanzhilu.cn' + item.img_url + '>' +
					'</i>' +
					'<div>' +
					'<h2 class="ellipsis">' + item.title + '</h2>' +
					'<p class="activity_time">活动时间：' + start + '</p>' +
					'<p class="activity_address">活动地点：' + item.address + '</p>' +
					'<p class="activity_text ellipsis">简介：' + item.desc + '</p>' +
					'<p><a href="../pages/activity/act_second.html?type=1?id=' + item.id + '">活动详情</a></p>' +
					'</div>' +
					'</li>';
			} else {
				new_list_html += '<li id=' + item.id + '>' +
					'<i>' +
					'<img src=http://www.foyuanzhilu.cn' + item.img_url + '>' +
					'</i>' +
					'<div>' +
					'<h2 class="ellipsis">' + item.title + '</h2>' +
					'<p class="activity_time">活动时间：' + start + ' - ' + end + '</p>' +
					'<p class="apply_time">报名时间：' + apply_start + ' - ' + apply_end + '</p>' +
					'<p class="activity_address">活动地点：' + item.address + '</p>' +
					'<p class="activity_text ellipsis">简介：' + item.desc + '</p>' +
					time_html +
					'</div>' +
					'</li>';
			}

		});
		if(type == 1) {
			$('#grid').html(old_list_html);
		} else {
			$('#grid1').html(new_list_html);
		}
	}

	//   点击查看活动详情
	$('.activity_list li').on('click', function() {
		var list_id = $(this).attr('id');
		sessionStorage.setItem('fy_list_id', list_id);
	})
});