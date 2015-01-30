(function(window, document, $, undefined){

	var topics = [];

	$.getJSON('assets/discussion.json', function(data){
		topics = data.topics;
		parseConversation();
	});

	function parseConversation(){
		$.each(topics, function(index, topic){

			var element = displayTopic(topic);
			$('#first').append(element);
		});
	}

	function displayTopic(topic, element){
		var element = $('<div/>').attr('class', 'comment'),
			quoteIcon = $('<i/>').attr('class', 'quote left icon avatar'),
			divider = $('<div/>').attr('class', 'ui dividing header'),
			topicContent = $('<div/>').attr('class', 'content'),
			text = $('<div/>').attr('class', 'text').html(topic.topictitle);

		topicContent.append(text);
		element.append(quoteIcon, topicContent, divider);

		if(topic.responses.length > 0){

			var comments = $('<div/>').attr('class', 'comments');

			$.each(topic.responses, function(index, response){
				console.log('Comment: ', response);
				comments = displayResponse(response, comments);
			});

			// need to check comment depth and parent id here to append comments to correct content !!!!

			element.append(comments);
		}

		return element;
	}

	function displayResponse(value, element){
		var response = $('<div/>').attr('class', 'comment').attr('data-id', value.id).attr('data-parent-id', value.parentid).append($('<div/>').attr('class', 'content')),
			author = $('<div/>').attr('class', 'author').html(value.author),
			text = $('<div/>').attr('class', 'text').html(value.posttext),
			date = new Date(1970,0,1);
			date.setSeconds(Date.now() - value.age);

		var time = $('<span/>').attr('class', 'date').html(date);

		response.append( author, time, text);

		return element.append(response);
	}

	

})(window, document, jQuery);

