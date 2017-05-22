$(function() {
	var client = ZAFClient.init();
	client.invoke('resize', { width: '100%', height: '210px' });
	client.get('ticket.requester.id').then(
		function(data) {
			var userId = data['ticket.requester.id'];
			getUser(client, userId);
		}
	);
});

function getSessions(client, token, email) {
	var sessions = {
		url:'https://www-beta.smartlook.com/api/sessions.list',
		type:'POST',
		data: {
			apiKey: token,
			/*filters: {
				visitorEmail: email
			},*/
			sorters: {
				timeStart: -1
			}
		}
	};

	client.request(sessions).then(
		function(data) {
			showSessions(data);
			console.log(data);
		},
		function(response) {
			showError(response);
		}
	);
}

function getUser(client, id) {
	var user = {
		url: '/api/v2/users/' + id + '.json',
		type:'GET',
		dataType: 'json',
	};

	client.request(user).then(
		function(data) {
			client.metadata().then(function(metadata) {
				getSessions(client, metadata.settings.token, data.user.email);
			});
		},
		function(response) {
			showError(response);
		}
	);
}

function showSessions(data) {
	var sessionsData = {
		'sessions': data.sessions
	};
	templateCompile(sessionsData, "main-template");
}

function showError(response) {
	var errorData = {
		'status': response.status,
		'statusText': response.statusText
	};
	templateCompile(errorData, "error-template");
}

function templateCompile(data, selector) {
	var source = $("#" + selector).html();
	var template = Handlebars.compile(source);
	var html = template(data);
	$("#content").html(html);
}