const http = require('request');
const config = require('../config/config.json');
const apiServer = config.server.path;

module.exports.blog = function (req, res) {
  const pathAPI = config.server.blog;
  const requestOptions = {
    url: apiServer + pathAPI,
    method: 'GET',
    json: {}
  };
  const sendObj = {
    title: 'My Blog'
  };
  http(requestOptions, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    res.render('my_pages/blog', Object.assign({}, sendObj, body));
  });
}
module.exports.navBlog = function (req, res) {
  return req.redirect('/blog');
}