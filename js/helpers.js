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

Handlebars.registerHelper('toDate', function(dateString) {
	var date = new Date(dateString);

	if (!!date.toLocaleDateString) {
		return date.toLocaleDateString();
	}

	return dateString;
});

Handlebars.registerHelper('toTime', function(dateString) {
	var date = new Date(dateString);

	if (!!date.toLocaleTimeString) {
		return date.toLocaleTimeString();
	}

	return '';
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
