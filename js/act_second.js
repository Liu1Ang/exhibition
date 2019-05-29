$(function() {
	function getUrlParam(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return decodeURIComponent(r[2]);
		return null;
	}
	var data = getUrlParam('type'); //使用方法，url为key值
	var type = data.split('?')[0];
	var id = data.split('?')[1].split('=')[1];
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
	//请求文章详情
	var list_id = id;
	$.get('http://www.foyuanzhilu.cn/pavilion/activity-detail?id=' + list_id, function(data) {
		//      console.log(data);
		//时间转换
		var start_time = new Date(data.start_time * 1000);
		var start = start_time.toStartTime();
		var end_time = new Date(data.end_time * 1000);
		var end = end_time.toEndTime();
		var apply_start_time = new Date(data.apply_start_time * 1000);
		var apply_start = apply_start_time.toTime();
		var apply_end_time = new Date(data.apply_end_time * 1000);
		var apply_end = apply_end_time.toTime();
		//结构
		var article = '';
		if(type == 1) {
			article = '<div class="box_one center">' +
				'<i>' +
				'<img src=http://www.foyuanzhilu.cn' + data.img_url + '>' +
				'</i>' +
				'<div>' +
				'<h2 class="title ellipsis">' + data.title + '</h2>' +
				'<p class="activity_time">活动时间：' + start + '</p>' +
				'<p class="activity_address">活动地点：' + data.address + '</p>' +
				'<p class="activity_text" >简介：' + data.desc + '</p>' +
				'</div>' +
				'</div>' +
				'<div class="box_three">' +
				'<h4>详情介绍：</h4>' +
				'<article>' + data.content + '</article>' + '</div>';
		} else {
			article = '<div class="box_one center">' +
				'<i>' +
				'<img src=http://www.foyuanzhilu.cn' + data.img_url + '>' +
				'</i>' +
				'<div>' +
				'<h2 class="title ellipsis">' + data.title + '</h2>' +
				'<p class="activity_time">活动时间：' + start + ' - ' + end + '</p>' +
				'<p class="apply_time">报名时间：' + apply_start + ' - ' + apply_end + '</p>' +
				'<p class="activity_address">活动地点：' + data.address + '</p>' +
				'<p class="activity_text ellipsis" >简介：' + data.desc + '</p>' +
				'<p class="activity_people"><span class="inIng">正在预约</span></p>\n' +
				'</div>' +
				'</div>' +
				'<div class="box_two">' +
				'<h4>我要报名：</h4>' +
				'<p>微信扫描下方二维码即可在线预约</p>' +
				'<i>' +
				'<img src="http://qr.liantu.com/api.php?text=' + data.apply_url + '"/>' +
				'</i>' +
				'</div>' +
				'<div class="box_three">' +
				'<h4>详情介绍：</h4>' +
				'<article>' + data.content + '</article>' + '</div>';
		}
		$('.mainbox').html(article);
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
            scrollTop:0,
        },500)
	});
});