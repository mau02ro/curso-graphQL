"use strict";

const mutations = require("./matations");
const querys = require("./querys");
const types = require("./types");

module.exports = {
  Query: querys,
  Mutation: mutations,
  ...types,
};
