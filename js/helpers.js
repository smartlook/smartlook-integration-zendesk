Handlebars.registerHelper('if', function(conditional, options) {
	if(conditional) {
		return options.fn(this);
	}
});

Handlebars.registerHelper('secondsFormatting', function(seconds) {
	var result = '';
	if (seconds < 60) {
		result = formatSeconds(seconds);
	} else if (seconds < 60 * 60) {
		result = formatMinutes(seconds);
	} else {
		result = formatHours(seconds);
	}
	return result;
});

Handlebars.registerHelper('platformIcon', function(platform) {
	if (platform == 'mac') {
		return 'apple';
	} else if (platform == 'blackberry') {
		return 'android';
	} else if (platform == 'ipad') {
		return 'tablet';
	} else if (platform == 'iphone') {
		return 'mobile';
	} else if (platform == 'others') {
		return 'question-circle';
	} else {
		return platform;
	}
});

Handlebars.registerHelper('browserIcon', function(platform) {
	if (platform === "others") {
		return 'question-circle';
	} else if (platform == 'explorer') {
		return 'internet-explorer';
	} else {
		return platform;
	}
});

Handlebars.registerHelper('deviceIcon', function(platform) {
	return platform;
});

Handlebars.registerHelper('timestampToDate', function(timestamp) {
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	var date = new Date(timestamp * 1000);
	var minutes = "0" + date.getMinutes();

	var hours = date.getHours();
	var postfix = hours >= 12 ? 'pm' : 'am';
	var hours = hours % 12;
	var hours = hours ? hours : 12;


	return months[date.getMonth()] + ' ' + date.getDate() + ',' + ' ' + hours + ':' + minutes.substr(-2) + ' ' + postfix;
});

function formatSeconds(seconds) {
	return '00:' + padNumber(seconds);
}

function formatMinutes(seconds) {
	const m = padNumber(Math.floor(seconds / 60));
	const s = seconds % 60;

	return m + ':' + padNumber(s);
}

function formatHours(seconds) {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds - (h * 3600) - (m * 60);

	return h + ':' + padNumber(m) + ':' + padNumber(s);
}

function padNumber(number) {
	if (number < 10) {
		return "0" + number;
	}
	
	return number;
}