var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');

/* GET users listing. */
router.get('/', function(req, res, next) {
  superagent.get('https://cnodejs.org/').end(function (err,result) {
      if(err){
        return next(err);
      }

      var $ = cheerio.load(result.text);;
      var items = [];
      $('#topic_list .topic_title').each(function (index, element) {
          var $element = $(element);
          items.push({
              title: $element.attr('title'),
              href: $element.attr('href')
          });
      });

      res.send(items);
  });
});

module.exports = router;
