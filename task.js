(function(window, document, $, undefined){

	var discussion;

	$.getJSON('assets/discussion.json', function(data){
		discussion = data.topics;
		parseConversation();
	});

	function parseConversation(){
		$.each(discussion, function(index, value){

			var element = displayTopic(value);
			$('#first').append(element);
		});
	}

	function displayTopic(value, element){
		var element = $('<div/>').attr('class', 'comment'),
			topic = $('<div/>').attr('class', 'content'),
			text = $('<div/>').attr('class', 'text').html(value.topictitle);

		topic.append(text);
		element.append(topic);

		if(value.responses.length > 0){

			var comments = $('<div/>').attr('class', 'comments');

			$.each(value.responses, function(index, value){
				comments = displayResponse(value, comments);
			});

			// need to check comment depth and parent id here to append comments to correct content !!!!

			element.append(comments);
		}

		return element;
	}

	function displayResponse(value, element){
		var response = $('<div/>').attr('class', 'comment').append($('<div/>').attr('class', 'content')),
			author = $('<div/>').attr('class', 'author').html(value.author),
			text = $('<div/>').attr('class', 'text').html(value.posttext),
			date = new Date(1970,0,1);
			date.setSeconds(Date.now() - value.age);

		var time = $('<span/>').attr('class', 'date').html(date);

		response.append( author, time, text);

		return element.append(response);
	}

	

})(window, document, jQuery);

