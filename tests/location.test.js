"use strict";
var supertest = require("supertest");
var {server} = require("../dist/js/server");
var api = supertest(server.getApp());


test("Location is returned as json", async function () {
    await api.post("/v1/location")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

afterAll(() => {
    server.close();
})
