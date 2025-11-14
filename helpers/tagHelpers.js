global.tags = {
	tagger: "no",
	tagged: "no",
};


global.enableTags = (stringArray) => {
	if (Array.isArray(stringArray)) {
		stringArray.forEach(str => {
			tags[str] = "yes";
		});
	} else {
        console.error("Invalid input: Expected an array of strings.");
    }
};

