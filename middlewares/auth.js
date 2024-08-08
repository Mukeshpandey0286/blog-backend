const { verifyToken } = require("../services/authentication");

const checkForAuthentication = async (req, res, next) => {
    const authorizationHeaderValue = req.headers["authorization"];
    req.user = null;

    if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer ")) {
        return next();
        // res.status(403).json("Bad request! Without token you can't do further action.")
    }

    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = verifyToken(token);

    if (user) {
        req.user = user;
    }

    return next();
};

const restrictToUser = (roles = []) => {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(400).json("You are not logged in!");
        }

        if (!roles.includes(req.user.role)) {
            return res.status(400).json("Unauthorized!");
        }

        return next();
    };
};

const errorMiddleware = (err, req, res, next) => {
    console.error("Error occurred:", err.message);
    if (!res.headersSent) {
      res.status(err.status || 500).json({ error: err.message });
    }
  };
  

module.exports = { checkForAuthentication, restrictToUser, errorMiddleware };
