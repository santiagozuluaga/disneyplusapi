"use strict";

const { database, logger, aws } = require("../../../../shared");

module.exports.handler = async (event) => {
    try {
        const movie = await database
            .collection("movies")
            .create(event.body)

        return {
            statusCode: 200,
            body: JSON.stringify(movie)
        };
    } catch (error) {
        logger.error(error);
        return {
            statusCode: 500,
            body: "Internal server error, try again."
        };
    }
}