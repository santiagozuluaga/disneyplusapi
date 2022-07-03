"use strict";

const { database, logger } = require("../../../../shared");

module.exports.handler = async (event) => {
    try {
        const movies = await database
            .collection("movies")
            .find(event.queryStringParameters);

        return {
            statusCode: 200,
            body: JSON.stringify(movies)
        };
    } catch (error) {
        logger.error(error);
        return {
            statusCode: 500,
            body: "Internal server error, try again.",
        };
    }
};