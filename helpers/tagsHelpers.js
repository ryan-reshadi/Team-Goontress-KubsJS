global.tags = {};


global.enableTags = (stringArray) => {
	if (Array.isArray(stringArray)) {
		stringArray.forEach(str => {
			tags[str] = "yes";
		});
	} else {
		console.error("Invalid input: Expected an array of strings.");
	}
};

global.removeTags = (stringArray) => {
	if (Array.isArray(stringArray)) {
		stringArray.forEach(str => {
			delete tags[str];
		});
	} else {
		console.error("Invalid input: Expected an array of strings.");
	}
};

global.resetTags = (event) => {
	Object.keys(global.tags).forEach(key => {
		runCommand(event, 'tag @a remove ' + key);
		removeTags([key]);
	});
};