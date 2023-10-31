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
	const data = {
		filters: [
			{
				name: "user_email",
				operator: "is",
				value: email || ''
			}
	
		],
		sort: {
			timeStart: "desc"
		}
	}

	const region = "{{setting.region}}" || 'eu'

	var sessions = {
		url: `https://api.${region}.smartlook.cloud/api/v1/sessions/search`,
		type:'POST',
		headers: {
			"Authorization": "Bearer {{setting.token}}",
			"Content-Type": "application/json"
		},
		secure: true,
		data: JSON.stringify(data)
	}

	client.request(sessions).then(
		function(data) {
			if (data.response >= 300) {
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
	if (typeof data.sessions === 'undefined' || data.totalSessionsCount === 0) {
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