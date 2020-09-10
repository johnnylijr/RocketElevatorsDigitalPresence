/*----------------------------------------
script_lightbox.js
2016.03.16 ver.1.00
----------------------------------------*/
$(function(){

	// lightBox add
	//----------------------------------------

		$("#lightboxInner").prepend($("#ad-lightbox"));
		$(".ad-rec1").clone().appendTo( $("#ad-lightbox") );
		$("#ad-lightbox").css({"display":"block"});

		if($("#ad-lightbox").height() < 100){
			$("#ad-lightbox p.txt").addClass("hide");
		}

});

