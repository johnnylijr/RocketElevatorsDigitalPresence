//PC-SP切り替えボタン
$(window).load(function(){

    //クッキーを取得
    var mode_str = $.cookie('sp_mode');

    //PCの場合、SPへのボタンを追加
    if(mode_str){
        if(mode_str == -1){
            $('footer .infomation .inline-list').prepend('<li class="btn-mode"><a class="mode-sp">スマートフォン版で見る</a></li>');
        }
    }

    //切り替えボタンがクリックされたらクッキーを書き換えてリロード
    $('.btn-mode').click(function(){
         var str = $('a',this).attr('class');
         if(str == 'mode-pc'){
          var mode_str = -1;//PCを表示
         }else{
          var mode_str = 1;//SPを表示
         }
        //cookieに保存
        var dd = new Date();
        dd.setTime(dd.getTime() + (1 * 24 * 3600 * 1000)); //1日
        document.cookie = "sp_mode=" + mode_str + ";expires="+dd.toUTCString()+";path=/;domain=.mainichi.jp;";
        //ページをリロード
        location.reload();
    });

    //Flashプレイヤー未対応向け（王将戦　棋譜）
    $('.btn-mode-sp a').click(function(){
        var mode_str = 1;//SPを表示
        //cookieに保存
        var dd = new Date();
        dd.setTime(dd.getTime() + (8 * 3600 * 1000)); //8時間
        document.cookie = "sp_mode=" + mode_str + ";expires="+dd.toUTCString()+";path=/;domain=.mainichi.jp;";
        //ページをリロード
        location.reload();
    });


});


