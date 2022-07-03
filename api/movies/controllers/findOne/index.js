"use strict";

const { database, logger } = require("../../../../shared");

module.exports.handler = async (event) => {
    try {
        const { id } = event.pathParameters;

        const movie = await database
            .collection("movies")
            .findOne(id);

        return {
            statusCode: 200,
            body: JSON.stringify(movie)
        };
    } catch (error) {
        logger.error(error);
        return {
            statusCode: 500,
            body: "Internal server error, try again.",
        };
    }
};