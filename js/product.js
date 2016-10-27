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
	return false;
	// if(canSubmit) sendContactForm(dataToSub,'contact_form.php');
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
	// console.log('send form:  '+ JSON.stringify(fInfo));
	sendingForm =  setTimeout(function() { canSendForm =true;}, 10000);
	$.ajax({
		type: 'post',
		url: url,
		data : fInfo,
		encode : true,
		success: function(result){
        $('#contact').find('input, textarea').val('');
        alert('message sent');
        canSendForm = true;
    }});
};

