"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogDefType = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.BlogDefType = (0, apollo_server_express_1.gql) `
  type BlogContent {
    title: String
    paragraph: String
  }
  type Blog {
    _id: ID
    head: String
    intro: String
    end: String
    image: String
    ccontent: [BlogContent]
  }

  type Query {
    blogs: [Blog!]
    blog(id: ID): Blog!
  }
`;
