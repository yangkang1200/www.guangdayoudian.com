
/*
调用：<a href="javascript:void(0)" onClick="addBookmark(document.title)" target="_self">加入收藏</a>
*/

function addBookmark(title) {
			 var url=parent.location.href;
			 if (window.sidebar) { 
					window.sidebar.addPanel(title, url,""); 
			 } else if( document.all ) {
			 window.external.AddFavorite( url, title);
			 } else if( window.opera && window.print ) {
			 return true;
			 }
}



/*
调用：<a href="javascript:void(0)" onclick="SetHome(this,window.location)" target="_self">设为首页</a>
*/
function SetHome(obj,vrl){
        try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
        }
        catch(e){
                if(window.netscape) {
                        try {
                                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
                        }  
                        catch (e) 
 { 
                                alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为“true”，点击“加入收藏”后忽略安全提示，即可设置成功。");  
                        }
                        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                        prefs.setCharPref('browser.startup.homepage',vrl);
                 }
        }
}

$(document).ready(function() {

	//首页banner箭头位置

	// ban 效果 

	var next1 = 0;

	var prev2 = 0;

	var click_shu = false;

	var str = "<li class='licurr'></li>"

	$(function() {

		var li_width = $("#ban .ban_bj").width();

		// 获取ban 滚动就是 li 的宽度

		$('#ban .ban_bj li').not(':first').css({
			left: li_width
		});

		// 获取 li的个数 也就是 发、滚动的次数

		li_shu = $('#ban .ban_bj li').length;

		for(var i = 1; i < li_shu; i++) {

			str = str + "<li></li>";

		}

		$(".ul_dian").html(str);

		// 自动 滚动 定时器

		movezi = window.setInterval(function() {

			zimove(prev2, next1);

		}, 5000)

		// 触碰 下面小图（就是触碰停止 自动滚动 离开启动 自动滚动 代码）

		$('#ban ul.ul_dian li').hover(function() {

			clearInterval(movezi)

		}, function() {

			movezi = window.setInterval(function() {

				zimove(prev2, next1);

			}, 5000);

		}) /**/

		// 触碰 banner（就是触碰停止 自动滚动 离开启动 自动滚动 代码）

		$('.ban_bj li').hover(function() {

			clearInterval(movezi);

		}, function() {

			movezi = window.setInterval(function() {

				zimove(prev2, next1);

			}, 5000);

		})

		$('.jiantou div').hover(function() {

			clearInterval(movezi);

		}, function() {

			movezi = window.setInterval(function() {

				zimove(prev2, next1);

			}, 5000);

		})

		$(".jiantou .jiantou_left").click(function() {

			if(next1 <= 0) {

				next1 = li_shu - 1;

				prev2 = 0;

			} else {

				prev2 = next1;

				next1 = next1 - 1;

			}

			moveleft(prev2, next1);

		});

		$("#flexslider").hover(function() {

			$(".jiantou").css("display", "inline-block");

		}, function() {

			$(".jiantou").hide(10)

		});

		$(".jiantou .jiantou_right").click(function() {

			if(next1 >= (li_shu - 1)) {

				next1 = 0;

				prev2 = li_shu - 1;

			} else {

				prev2 = next1;

				next1 = next1 + 1;

			}

			moveright(prev2, next1);

		});

		// 点击 下面小图 执行的代码

		$('#ban ul.ul_dian li').click(function() {

			// 这个是获取 点击小图标 是第几个 返回的数 bannercurrIndex 就是 prev2

			var bannercurrIndex = $('#ban ul.ul_dian li').index(this);

			// 这个就是  自动滚动 代码

			moveright(next1, bannercurrIndex);

			// 这样 是为了  下面 执行 滚动

			next1 = bannercurrIndex;

		})

	})

	//首页向   右   自动移动

	function moveright(_prev, _next) {

		li_width = $("#ban .ban_bj").width();

		$('#ban .ban_bj li').eq(_next).addClass("on").siblings().removeClass("on");

		$('#ban .ban_bj li').eq(_prev).stop(true, false).animate({
			left: -li_width
		}, 1000, function() {})

		// 小图标 remove add  .Class

		$('#ban ul.ul_dian li').eq(_prev).removeClass('licurr');

		$('#ban ul.ul_dian li').eq(_next).addClass('licurr');

		$('#ban .ban_bj li').eq(_next).css({
			left: li_width
		}).stop(true, false).animate({
			left: 0
		}, 1000, function() {

			click_shu = false;

		})

	}

	//首页向  左   自动移动

	function moveleft(_prev, _next) {

		li_width = $("#ban .ban_bj").width();

		$('#ban .ban_bj li').eq(_next).addClass("on").siblings().removeClass("on");

		$('#ban .ban_bj li').eq(_prev).stop(true, false).animate({
			left: li_width
		}, 1000, function() {})

		$('#ban ul.ul_dian li').eq(_prev).removeClass('licurr');

		$('#ban ul.ul_dian li').eq(_next).addClass('licurr');

		$('#ban .ban_bj li').eq(_next).css({
			left: -li_width
		}).stop(true, false).animate({
			left: 0
		}, 1000, function() {

			click_shu = false;

		})

	}

	// 自动移动 实际 执行代码

	function zimove() {

		if(next1 >= (li_shu - 1)) {

			next1 = 0;

			prev2 = li_shu - 1;

		} else {

			prev2 = next1;

			next1 = next1 + 1;

		}

		moveright(prev2, next1);

	}

	$(document).ready(function(e) {

		$('.flex_comBtn').hover(function() {

			window.clearInterval(movezi)

		}, function() {

			movezi = window.setInterval(function() {

				zimove(prev2, next1);

			}, 5000)

		})

	});

})