'use strict';

const controllers = require("./index");

test("example schedule", async () => {
    const response = await controllers.handler();
    console.log(response);
})