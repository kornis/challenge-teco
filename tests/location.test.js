"use strict";
const supertest = require("supertest");
const should = require("should");
const {server} = require("../dist/js/server");
const api = supertest(server.getApp());

describe("API Location", () => {
    test("Location is returned as json", async function () {
        const result = await api.get("/v1/location")
            .expect(200)
            .expect("Content-Type", /application\/json/);
            
            result.body.data.lat.should.be.a.Number();
    });
});

afterAll(() => {
    server.close();
});
