/*global exports, console, require*/
const _ = require('lodash');
const qs = require('qs');
const url = require('url');
const designersMockArray = require('./mocks/designersMock');

exports.parseQuery = function query (req, res, next) {
  'use strict';
  // parse the query, add query to req object for next middleware to use
  _.noop(res);
  if (!req.query) {
    if (req.url.indexOf('?') >= 0) {
      req.query = qs.parse(url.parse(req.url).query);
    } else {
      req.query = {};
    }
  }
  next();
};
exports.parseJSONBody = function (req, res, next) {
  'use strict';
  _.noop(res);
  var jsonString = '';
  if (req.method === 'PUT' || req.method === 'POST') {
    req.on('data', function (data) {
      jsonString += data;
    });
    req.on('end', function () {
      try {
        req.JSONbody = JSON.parse(jsonString);
      } finally {
        next();
      }
    });
  } else {
    next();
  }
};
exports.createVisionAPI = () => {
  return (req, res, next) => {
    let url = req.url;
    if (url.indexOf('designers') >= 0) {
      if (req.method === 'GET') {
        let a = JSON.stringify(designersMockArray);
        console.log(a);
        res.end(a);
      } else if (req.method === 'POST') {
        res.end('ok');
      }
    } else {
      next();
    }
  };
};
