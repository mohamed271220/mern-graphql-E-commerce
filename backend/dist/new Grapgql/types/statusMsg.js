"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMsg = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.StatusMsg = (0, apollo_server_express_1.gql) `
  type StatusMsg {
    msg: String
    status: Int
  }
`;
