(function(window, document, $, undefined){

	var topics = [];

	$.getJSON('assets/discussion.json', function(data){
		topics = data.topics;
		parseConversation();
	});

	function parseConversation(){
		$.each(topics, function(index, topic){

			displayTopic(topic, index);

		});
	}

	function displayTopic(topic, index){
		var element = $('<div/>').attr('class', 'comment').attr('data-topic', index),
			quoteIcon = $('<i/>').attr('class', 'orange quote left icon avatar'),
			divider = $('<div/>').attr('class', 'ui section divider'),
			topicContent = $('<div/>').attr('class', 'content'),
			text = $('<div/>').attr('class', 'text').html(topic.topictitle);

		topicContent.append(text);

		element.append( quoteIcon, topicContent);

		$('#first').append(element, divider);

		if(topic.responses.length > 0){

			appendResponses(topic.responses, index);

		}

	}


	function appendResponses(responses, index){
		var parentId = 0,
			index = index.toString(),
			comments,
			maxParentId = Math.max.apply(null, responses.map( function(response){ return response.parentid;}) );

		do {
			
			var commentDepth = responses.filter( function(response){
				return response.parentid === parentId;
			});

			if( commentDepth.length > 0){
				comments = threadResponses( commentDepth, parentId);

				if(parentId === 0){
					$("div[data-topic=" + index + "]").append( comments);
				} else{
					$('div[data-id=' + parentId + ']').append( comments);
				}
				parentId = commentDepth[0].id;
				console.log('INDEX: ', index, 'PARENTID: ', parentId);
			} else {
				parentId++;
			}


		} while( parentId < maxParentId+1);
	}

	function threadResponses( responses, index){

		var comments = $('<div/>').attr('class', 'comments');

		$.each( responses, function( index, response){
			var responseContent = $('<div/>').attr('class', 'comment').attr('data-id', response.id).attr('data-parent-id', response.parentid).append($('<div/>').attr('class', 'content')),
				angleIcon = $('<i/>').attr('class', 'teal comment outline icon avatar'),
				author = $('<div/>').attr('class', 'author').html(response.author),
				text = $('<div/>').attr('class', 'text').html(response.posttext),
				date = new Date(1970,0,1);
				date.setSeconds(Date.now() - response.age);

			var time = $('<span/>').attr('class', 'date').html(date);

			responseContent.append( angleIcon, author, time, text);
			comments.append( responseContent);
		});

		return comments;		
	}

	

})(window, document, jQuery);

