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

APP.getSessions = function(client, email) {
	var sessions = {
		url: 'https://fiona.smartlook.com/api/sessions.list',
		headers: {"x-apiKey": "{{setting.token}}"},
		secure: true,
		type:'POST',
		data: {
			filters: {
				visitorEmail: email || ''
			},
			sorters: {
				timeStart: -1
			}
		}
	};

	client.request(sessions).then(
		function(data) {
			if (!data.ok) {
				APP.templateCompile({
					'status': 'Error',
					'statusText': data.error
					},
					"error-template"
				)
			} else {
				APP.showSessions(client, data);
			}
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
				APP.getSessions(client, data.user.email);
			});
		},
		function(response) {
			APP.showError(response);
		}
	);
}

APP.showSessions = function(client, data) {
	if (typeof data.sessions === 'undefined' || !data.sessions.length) {
		APP.templateCompile({}, "noRecordings-template");
		client.invoke('resize', { width: '100%', height: '80px' });
		return;
	}

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