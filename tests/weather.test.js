"use strict";
const supertest = require("supertest");
const should = require("should");
const {server} = require("../dist/js/server");
const api = supertest(server.getApp());

test("Get weather by location is returned as json and latitude expected to be a number", async () => {
    const result = await api.get("/v1/current")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    
    result.body.data.lat.should.be.a.Number();
});

test("Get weather by city is returned as json, latitude expected to be a number and city to be Buenos Aires", async () => {
    const result = await api.get("/v1/current/buenos%20aires")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    
    result.body.data.lat.should.be.a.Number();
    result.body.data.city.should.be.equal("Buenos Aires")
});


test("Get 3-day-forecast is returned as json and city value expected to be a string", async () => {
    const result = await api.get("/v1/forecast")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    
    result.body.data.city.should.be.String();
});

test("Get 3-day-forecast sending city params expected to get that city forecast", async () => {
    const result = await api.get("/v1/forecast/london")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    
    result.body.data.city.should.be.equal("London");
});

test("Get 3-day-forecast sending city params expected to get an array of forecast", async () => {
    const result = await api.get("/v1/forecast/london")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    
    result.body.data.forecast.should.have.length(3);
});

afterAll(() => {
    server.close();
});