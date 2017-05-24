APP = {};

APP.init = function() {
	var client = ZAFClient.init();
	client.invoke('resize', { width: '100%', height: '210px' });
	client.get('ticket.requester.id').then(
		function(data) {
			var userId = data['ticket.requester.id'];
			APP.getUser(client, userId);
		}
	);
}

APP.getSessions = function(client, token, email) {
	var sessions = {
		url:'https://www-beta.smartlook.com/api/sessions.list',
		type:'POST',
		data: {
			apiKey: token,
			filters: {
				visitorEmail: email
			},
			sorters: {
				timeStart: -1
			}
		}
	};

	client.request(sessions).then(
		function(data) {
			APP.showSessions(data);
		},
		function(response) {
			APP.showError(response);
		}
	);
}

APP.getUser = function(client, id) {
	var user = {
		url: '/api/v2/users/' + id + '.json',
		type:'GET',
		dataType: 'json',
	};

	client.request(user).then(
		function(data) {
			client.metadata().then(function(metadata) {
				APP.getSessions(client, metadata.settings.token, data.user.email);
			});
		},
		function(response) {
			APP.showError(response);
		}
	);
}

APP.showSessions = function(data) {
	var sessionsData = {
		'sessions': data.sessions
	};
	APP.templateCompile(sessionsData, "main-template");
}

APP.showError = function(response) {
	var errorData = {
		'status': response.status,
		'statusText': response.statusText
	};
	APP.templateCompile(errorData, "error-template");
}

APP.templateCompile = function(data, selector) {
	var source = $("#" + selector).html();
	var template = Handlebars.compile(source);
	var html = template(data);
	$("#content").html(html);
}

$(function() {
	APP.init();
});