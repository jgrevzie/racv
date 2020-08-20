"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var koa_1 = __importDefault(require("koa"));
var apollo_server_koa_1 = require("apollo-server-koa");
var typeDefs = apollo_server_koa_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    hello: String\n  }\n"], ["\n  type Query {\n    hello: String\n  }\n"])));
var resolvers = {
    Query: {
        hello: function () { return 'Hello!'; }
    }
};
var server = new apollo_server_koa_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
var app = new koa_1["default"]();
app.use(server.getMiddleware());
app.listen({ port: 4000 }, function () {
    console.info('server started on port 4000 😀');
});
var templateObject_1;
