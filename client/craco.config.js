const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@@": __dirname,
			"@@@": path.resolve(__dirname, ".."),
		},
	},
};
