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
			// $('.ic-wrap').each
		}

	});	
});
