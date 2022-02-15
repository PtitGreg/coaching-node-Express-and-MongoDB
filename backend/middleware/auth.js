const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		const token = req.headers.autorization.split(" ")[1];
		const decoded = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		const userId = decodedToken.userId;
		req.auth = { userId };
		if (req.body.userId && req.body.userId !== userId) {
			throw "Invalid user id";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request"),
		});
	}
};
