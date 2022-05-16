"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var inversify_identifiers_1 = __importDefault(require("../../utils/inversify_identifiers"));
var Application_1 = require("../../Application");
var IpApi_1 = require("../../Infrastructure/Ip-api/IpApi");
var container = new inversify_1.Container();
// Infrastructure
container.bind(inversify_identifiers_1.default.IPLOCATOR).to(IpApi_1.IpApi).whenTargetNamed("ip-api");
// Application
container.bind(inversify_identifiers_1.default.IPLOCATORSERVICE).to(Application_1.IpLocationService);
exports.default = container;
