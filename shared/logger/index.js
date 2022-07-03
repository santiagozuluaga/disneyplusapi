const { env } = require("../env");

const LOGGER_ENVIROMENT = env.getString("LOGGER_ENVIROMENT", "") == "development";

module.exports = {
    logger: {
        error: (body) => {
            if (LOGGER_ENVIROMENT)
                return console.error(body);
            //Complete here with logger logic for production
        },
        warning: (body) => {
            if (LOGGER_ENVIROMENT)
                return console.warn(body);
            //Complete here with logger logic for production
        },
        info: (body) => {
            if (LOGGER_ENVIROMENT)
                return console.info(body);
            //Complete here with logger logic for production
        },
        log: (body) => {
            if (LOGGER_ENVIROMENT)
                return console.log(body);
            //Complete here with logger logic for production
        }
    }
};