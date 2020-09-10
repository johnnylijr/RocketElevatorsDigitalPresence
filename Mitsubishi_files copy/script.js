/*----------------------------------------
script.js
2016.08.19 ver.1.00
----------------------------------------*/
$(function(){

    //設定ボタン
    $('#setting-btn').on('click',function(){
    	$('#setting-menu').toggle();
    });

	// noscript
	$("noscript").addClass("hide");


	// tool固定
	//----------------------------------------
	$(window).on('load',function(){
		if($("#tools").length > 0){
			var tool = $("#tools");
			var area = $(".main-text");

			var offset = tool.offset();
			var myLeft = offset.left;
			var myTop = offset.top;


			$(window).scroll(function(){
				// 高さ取得
				var toolBottom = tool.height() + $(this).scrollTop();
				var areaBottom = area.offset().top + area.height();

				if($(window).scrollTop() > myTop) {
					if(areaBottom < toolBottom){ // 指定エリアより下
						tool.css({
							"position":"absolute",
							"top":"auto",
							"bottom":"0",
							"right":"0"
						});
					} else { // 指定エリア内は固定
						tool.css({
							"position":"fixed",
							"top":"0",
							"bottom":"auto",
							"right":"auto",
							"margin-left":"645px" // 756-48-63
						});
					}
				} else { // 指定エリアより上
					tool.css({
						"position":"absolute",
						"top":"0",
						"bottom":"auto",
						"right":"0"
					});
				}
			});
		}
	});


	// font-size change
	//----------------------------------------
	if($(".article").length > 0 || $("article").length){
		var myFontSize = $.cookie("fontSize");
		if($.cookie("fontSize")){
			if(myFontSize == "font-l"){
				$("#tools ul li.btn-fontSize a.btn").addClass("l-active");
				$(".main-text").addClass("lsize");
				$(".main-photo").addClass("lsize");
			}else{
				$("#tools ul li.btn-fontSize a.btn").removeClass("l-active");
				$(".main-text").removeClass("lsize");
				$(".main-photo").removeClass("lsize");
			}
            console.log('fontSize:'+$.cookie("fontSize"));
		}else{
				$("#tools ul li.btn-fontSize a.btn").removeClass("l-active");
				$(".main-text").removeClass("lsize");
				$(".main-photo").removeClass("lsize");
				$.cookie("fontSize", "font-m", {expires:14,path:'/'});
            console.log('fontSize:'+$.cookie("fontSize"));
		}

		$(".btn-fontSize a").click(function(event){
			event.preventDefault();
			if($(this).hasClass("l-active")){
                $(this).removeClass("l-active");
				$.cookie("fontSize", "font-m", {expires:14,path:'/'})
				$(".main-text").removeClass("lsize");
				$(".main-photo").removeClass("lsize");
            console.log('fontSize:'+$.cookie("fontSize"));
			}else{
                $(this).addClass("l-active");
				$.cookie("fontSize", "font-l", {expires:14,path:'/'})
				$(".main-text").addClass("lsize");
				$(".main-photo").addClass("lsize");
            console.log('fontSize:'+$.cookie("fontSize"));
            }
			//location.reload();
		});
	}


	// channel list
	//----------------------------------------
	var myListWid = 0;
	var listWid = $(".article .article-infoBox").innerWidth();
	var channelListOuterHeight = $(".article ul.channel-list").outerHeight();
	var channelListHeight = $(".article ul.channel-list li").outerHeight() + 3;

	if(channelListOuterHeight > channelListHeight){
		$(".article ul.channel-list").append('<li class="more">すべて表示する</li>');
		var moreBtn = $(".article ul.channel-list li.more");
		var moreBtnWid = moreBtn.outerWidth() + 6;

		for(var i = 0; i < $(".article ul.channel-list li").length; i++){
			myListWid += $(".article ul.channel-list li").eq(i).outerWidth() + 6;
			if(listWid > myListWid + moreBtnWid){
				moreBtn.addClass("hide");
			}else{
				$(".article ul.channel-list li").not("li.more").eq(i).addClass("hide");
				moreBtn.removeClass("hide");
			}
		}
		$(".article ul.channel-list li.more").click(function(){
			$(".article ul.channel-list li").removeClass("hide");
			moreBtn.addClass("hide");
		});
	}


	// SNS
	//----------------------------------------
	var ios_app =''; /* dummy */
	//var url = window.location.href;
	var url = $("link[rel='canonical']").eq(0).attr('href');
	if(url){
		url = url.replace(/stg\./g,'');
	}
	var num = 0;

	var eurl   = encodeURI(url);
	var eurlc  = encodeURIComponent(url);
	var etitle = encodeURIComponent(document.title);
	var tweet  = encodeURIComponent(document.title + " ") + eurl;

	var share = $('ul.share');
	share.append('<li class="tw btn-sns"><a href="//twitter.com/intent/tweet?text=' + tweet + '" target="_blank" data-sns="twitter" data-snsaction="share"></a><a href="http://twitter.com/search?q=' + eurlc + '" target="_blank" class="count" data-sns="twitter" data-snsaction="timeline">Timeline</a></li>');
	share.append('<li class="fb btn-sns"><a href="//www.facebook.com/share.php?u=' + eurlc + '" target="_blank" data-sns="facebook" data-snsaction="share"></a></li>');
	share.append('<li class="hb btn-sns"><a href="//b.hatena.ne.jp/entry/' + eurl + '" target="_blank" data-sns="hatena-bookmark" data-snsaction="share"></a></li>');

	//console.log($('link[rel=canonical]').eq(0).attr("href"));

	// facebook シェア数取得
	$.ajax({
		url: '//graph.facebook.com/?id=' + eurl,
		type: 'GET',
		cache: false,
		dataType: 'jsonp'
	}).done(function(data, status, xhr) {
		if (typeof data.share !== 'undefined'){
			num = data.share.share_count;
		}else {
			num = " ";
		};
		var count = $('<span>');
		count.addClass('count').html(num);
		$('.fb',share).append(count);
	}).error(function(data, status, xhr) {
		console.log("STATUS:" + xhr.status);
	});

	// hatena シェア数取得
    if (location.protocol === 'https:') {
        var apihatena = 'https://b.hatena.ne.jp';
    } else {
        var apihatena = 'http://cdn.api.b.hatena.ne.jp';
    }
    var urlhatena = location.protocol + '//b.hatena.ne.jp';

    $.ajax({
        type: 'GET',
        url: apihatena + '/entry.count',
        data: { url : eurl },
        dataType: 'jsonp',
        success: function(num) {
            var count = $('<span>');
            count.addClass('count').html(num);
            //count.attr('target','_blank').attr('href','http://b.hatena.ne.jp/entry/' + eurl);
            $('.hb',share).append(count);
        }
    });

});


// スムーズスクロール
//----------------------------------------
function time(){
  if(Math.abs(current_y - target_y)<Math.abs(speed)){
    window.scrollTo((document.body.scrollTop || document.documentElement.scrollTop),target_y);
    clearInterval(timer);
    return false;
  }else{
    window.scrollBy(0,speed);
    current_y += speed;
  }
}
function move(val){
  smooth = 25;
  current_y = document.body.scrollTop || document.documentElement.scrollTop;
  path = '' + val;
  target = path.split('#');
  element = document.getElementById(target[1]);
  target_y = 0;
  for(i = element;i.offsetParent;i = i.offsetParent){
    target_y += i.offsetTop;
  }

  renge = Math.abs(Math.round(target_y - current_y));
  speed = Math.round(renge/5);

  if(current_y > target_y){
    speed = -(speed);
  }
  timer = setInterval('time()',smooth);
  return false;
}
function act(){
  var a = document.querySelectorAll('a[href^="#top"], a[href^="#mainNavi"], a[href^="#a"]');

  for(var i=0; i < a.length; i++){
    a[i].onclick = function(){
      move(this);
      return false;
    }
  }
}
window.addEventListener('DOMContentLoaded',act,false);



// cx
//----------------------------------------
function cxSendSnsClicked(target){
  var snsName = target.getAttribute('data-sns') ? target.getAttribute('data-sns') : "";
  var articleId = document.querySelector('meta[name="cXenseParse:recs:articleid"]') && document.querySelector('meta[name="cXenseParse:recs:articleid"]').content ?
    document.querySelector('meta[name="cXenseParse:recs:articleid"]').content : "" ;//メタタグ「cXenseParse:recs:articleid」
  var actionName = target.getAttribute('data-snsAction') ? target.getAttribute('data-snsAction') : "";
  if(snsName && actionName){
    cX.setEventAttributes({origin:'mai-web', persistedQueryId:'fead2bc65fbe64e10dbc2f536fe1f09ba4412432'});
    cX.sendEvent('sns', {アクション:actionName, SNS:snsName, 記事:articleId});
  }
}
function onClickEvent() {
  try {
    var event = event || window.event;
    if (event) {
      var target = event.target || event.srcElement;
      for (var i = 0; (i < 10) && (typeof target !== 'undefined') && (target); i++) {
        if (target.nodeType === 1 && (target.nodeName === 'a' || target.nodeName === 'A') && typeof target.href === 'string') {
          if (target.parentElement.className.indexOf("btn-sns") != -1) {
            cxSendSnsClicked(target);
          }
          break;
        }
        target = target.parentNode;
      }
    }
  } catch (e) {}
  return true;
};
window.addEventListener('mouseup',onClickEvent,false);


// 拡大画像が大きくなかったらズーム削除
//----------------------------------------
function removeZoom(imgdata) {
  //data-lightbox削除
  imgdata.removeAttribute('data-lightbox');
  //no-zoomクラス追加
  imgdata.classList.add('no-zoom');
}

function actImg(){
  var imgData = document.querySelectorAll('a[data-lightbox^="photos"]');
  for(var i=0; i < imgData.length; i++){
    zoomImg = imgData[i].getAttribute('data-href').split('/').pop();
    img = imgData[i].getElementsByTagName('img')[0].getAttribute('src').split('/').pop();
    //画像名（数字）
    zoomImgNum = zoomImg.split('.').shift();
    //切り抜き画像 0c8 は処理しない
    zoomImgNum = zoomImgNum == '0c8'?100:Number(zoomImgNum);
    imgNum = Number(img.split('.').shift());

    if(zoomImgNum <= imgNum){
      removeZoom(imgData[i]);
    }
  }
  //画面全幅の画像だったらズーム削除
  var wideImg = document.querySelectorAll('.img-center, .img-top, .img-bottom');
  for(var j=0; j < wideImg.length; j++){
    if(wideImg[j].getElementsByTagName('a')[0].hasAttribute('data-lightbox')){
      removeZoom(wideImg[j].getElementsByTagName('a')[0]);
    }
  }

}
window.addEventListener('DOMContentLoaded',actImg,false);

;(function($){
  $.fn.reloadButton = function(options){

    //default
    var defaults = {
      'end': 60, // 60秒後に更新
      'bgblack': false, //背景が黒の場合 true
      'reload': false
    }

    var settings = $.extend( {}, defaults, options );

    return this.each(function(){
      var self = $(this);
      var loadTimerv2 = "";

      //settings
      var sec = settings.end;
      if(settings.bgblack){
          self.addClass("bgblack");
      }

      if($.cookie("reloadTimerv2") == "no"){

	      $("#switch-button").prop("checked",false);
          self.find(".switch-reload-txt span").text(sec + '秒後');

	  }else{

         //PCではデフォルトで自動更新する
         $("#switch-button").prop("checked",true);
         self.find(".switch-reload-txt span").text(sec + '秒後');
		  _loadTimerFunc();

	  }

      $("#switch-button").change(function(){

		  _loadTimerFunc();

      });

	  function _loadTimerFunc(){

         if($("#switch-button").prop('checked')) {

             //ON
	         self.find(".switch-reload-txt span").text(sec + '秒後');

		     loadTimerv2 = setInterval(function(){

                 if(sec <= 1){

                     //location.reload();
                     window.location.reload(true);

                 } else {

                     sec--;
                     self.find(".switch-reload-txt span").text(sec + '秒後');

                 }

		     },1000);

		     $.removeCookie('reloadTimerv2');

	     }else{
             //OFF
		     clearInterval(loadTimerv2);
		     $.cookie('reloadTimerv2', "no", {expires:1,path:'/'});
             self.find(".switch-reload-txt span").text(sec + '秒後');

	     }
       }


    });
  };
}(jQuery));
