$(document).ready(function() {

	var messags;

	$.ajax({
		type: 'GET',
		url: 'post.php',
		datatype: 'json',
		success: function(data) {
			createMessages(data);
		}
	});
	
	$("#post input[type='button']").click(function() {


		var message = $('textarea').val();
		var name = $('input[type="text"]').val();

		//Form Validation
		if (message == '' || name == '') {
			alert('You did not fill out all of the fields.');
			return;
		}

		var data = {'name': name, 'message': message};

		$.ajax({
			type: "POST",
			url: 'post.php',
			data: data,
			success: function(data) {
				$('textarea').val("");
				$('input[type="text"]').val("");
				createMessages(data);
			}
		});
		
	});

	$("#message a").click(function() {
		var id = $('article h3 span').attr("id");

		if ($("a").attr("id") === "next") {
			id++;
		} else {
			id--;
		}

		if (id > messages.length - 1) id = 0;
		if (id < 0) id = messages.length - 1;

		formatMessages(messages, id);	
	});

	$('h3').click(function() {
		$('section.eul').hide();
		console.log(this.id);
		$('#' + this.id + ' + section').show();
	});

	function getMessages(data) {
		var array = JSON.parse(data);
		array.reverse();
		return array;
	}

	function formatMessages(messages, id) {
		$('article h3 span').attr("id", id);
		$('article p').html(messages[id]['message']);
		$('article h3 span').html(messages[id]['name']);
	}

	function createMessages(data) {
		var id = 0;
		messages = getMessages(data);
		formatMessages(messages, id);
	}

});
