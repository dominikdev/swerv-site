onSubmitForm = function(){
	var canSubmit = true;
	var dataToSub = {};
	console.log('...');

	$('#c-form').find('input, textarea').each(function(){
		var info = [$(this).attr('name'),$(this).val()];
		console.log(info);
		var validate = inputVal(info[0],info[1]);
		console.log(validate);
		dataToSub[info[0]] = info[1];
		if(!validate){
			canSubmit = false;
		}
		// console.log(info);
	});
	
	console.log(canSubmit + " : " + JSON.stringify(dataToSub));
	// return false;
	if(canSubmit) sendContactForm(dataToSub,'contact_form.php');
}
inputVal = function(type,inpt){
	switch(type){
		case 'email':
		return (inpt.indexOf('@') > -1 && inpt.lastIndexOf('.') > inpt.indexOf('@')) ? true : false;
		break;
		case 'first_name':
		case 'last_name':
		return (inpt.length > 0);
		break;
		case 'message':
		return true;
		break;
		case 'phone':
		return (inpt.length >=10)
		break;
	}
}
sendContactForm = function(fInfo,url,cb){
	sendingForm =  setTimeout(function() { canSendForm =true;}, 10000);
	$.ajax({
		type: 'post',
		url: url,
		data : fInfo,
		encode : true,
		success: function(result){
			$('#contact').find('input, textarea').val('');
			canSendForm = true;
		}});
};

$('.fadein').each(function(i){
	
});

$(document).on('click','#close',function(){
	$('.service-content-right.selected, #services').removeClass('selected');
	$('#service-info, #services .overlay').removeClass('expanded');
	var p = $('#services').position().top;
	$("html, body").animate({ scrollTop: p },1000);
});
$(document).on('click','.service-content-right',function(){
	var p = $('#service-info').position().top;
	$('.service-content-right.selected').removeClass('selected');
	$(this).addClass("selected");
	if($('#service-info').hasClass('expanded'))
	{
		$("html, body").animate({ scrollTop: p },1000);
		return;
	}
	
	var pos = $(this).position();
	$('#services .overlay').css('top', pos.top+75).css('left',pos.left+125);
	$('#services').addClass("selected");
	$('#service-info').addClass("expanded");
	setTimeout(function(){$('#services .overlay').addClass('expanded');},500);
	 
	setTimeout(
		function(){
			$("html, body").animate({ scrollTop: p },1000);
		},200);


});
$(document).on('click','.left-arrow',function(){
	$('#inner-img-slider').addClass('left');
});
$(document).on('click','.port-sort-btn',function(){
	var s = $(this).attr('sort-sel');

	var allSel = ($('.port-sort-btn.selected').length == 4) ? true : false;
	console.log(allSel);
	if(allSel)
	{
		$('.port-box-wrap').not('.port-box-wrap[sort='+s+']').addClass("remove");
		$('.port-sort-btn').not('.port-sort-btn[sort-sel='+s+']').removeClass("selected");

		return false;
	}

	if($(this).hasClass('selected'))
	{
		$('.port-box-wrap[sort='+s+']').addClass("remove");
		$(this).toggleClass("selected");
		return;	
	}
	else
	{
		// var s = $(this).attr('sort-sel');
		$('.port-box-wrap[sort='+s+']').removeClass("remove");
		$(this).toggleClass("selected");
		return;	
	}
	$(this).toggleClass("selected");
	var s = $(this).attr('sort-sel');
	console.log(s);
	$('.port-box-wrap').not('.port-box-wrap[sort='+s+']').addClass('remove');
	setTimeout(function(){
		$('.port-box-wrap.remove').hide();
	},1000);
});
$(document).on('click','.port-box',function(){
	// $("#port-popup").addClass('show');
	// $('#port-highlight').addClass("expanded");
	// $('.port-box-wrap').addClass('remove');
});
$(document).on('click','#close-port',function(){
	// $("#port-popup").addClass('show');
	// $('#port-highlight').removeClass("expanded");
	// $('.port-box-wrap').removeClass('remove');
});
$(document).on('click','#expand',function(){
	// $("#port-popup").addClass('show');
	// $('#port-highlight').addClass("expand-img");
	// $('.port-box-wrap').removeClass('remove');
});
$(document).on('click','#port-popup .close',function(){
	// $("#port-popup").removeClass('show');
});
$(document).ready(function(){
	webApp = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) ? false : true;
	console.log(webApp);
	if(!webApp) $('#vid-wrap').hide();
	$(document).on('scroll',function(){
		// console.log(window.pageYOffset);
		var pos = window.pageYOffset;
		var ser = $('#services').position().top - 100;

		if(pos >= ser)
		{
			$('.ic-wrap').addClass('show');
		}

	});	
});
