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
			divider = $('<div/>').attr('class', 'ui section divider'),
			topicContent = $('<div/>').attr('class', 'content'),
			text = $('<div/>').attr('class', 'text').html(topic.topictitle);

		topicContent.append(text);
		element.append(divider, quoteIcon, topicContent);


		if(topic.responses.length > 0){

			var comments = $('<div/>').attr('class', 'comments');

		//	$.each(topic.responses, function(index, response){
		//		console.log('Comment: ', response);
				comments = displayResponse(topic, topic.responses[0], comments, 0);
		//	});

			// need to check comment depth and parent id here to append comments to correct content !!!!

			element.append(comments);
		}

		return element;
	}

	function displayResponse(topic, response, element, index){


		var responseContent = $('<div/>').attr('class', 'comment').attr('data-id', response.id).attr('data-parent-id', response.parentid).append($('<div/>').attr('class', 'content')),
			angleIcon = $('<i/>').attr('class', 'angle double up icon avatar'),
			author = $('<div/>').attr('class', 'author').html(response.author),
			text = $('<div/>').attr('class', 'text').html(response.posttext),
			date = new Date(1970,0,1);
			date.setSeconds(Date.now() - response.age);

		var time = $('<span/>').attr('class', 'date').html(date);

		responseContent.append( angleIcon, author, time, text);

		if( topic.responses[index+1] && topic.responses[index+1].parentid === response.id){
			var comments = $('<div/>').attr('class', 'comments');
			return element.append( responseContent, displayResponse(topic, topic.responses[index+1], comments, index+1));
		} else if( topic.responses[index+1] ){
			return element.append( responseContent, displayResponse(topic, topic.responses[index+1], element, index+1));
		}

		return element.append(responseContent);
	}

	

})(window, document, jQuery);

