const mongoose = require('mongoose');

module.exports.getSlides = function (req, res) {
  const slider = mongoose.model('slider');
  const mesDefault = [{
    title: 'В базе нет работ',
    technologies: 'Frontend',
    url: ''
  }];
  slider
    .find()
    .then(items => {
      if (!items.length) {
        res
          .status(200)
          .json({dataArr: mesDefault});
      } else {
        res
          .status(200)
          .json({dataArr: items});
      }
    });
};
module.exports.addSlide = function (req, res) {
  const Model = mongoose.model('slider');
  let item = new Model({
    title: req.body.title,
    technologies: req.body.technologies,
    url: req.body.url
  });
  // сохраняем запись в базе
  item
    .save()
    .then(item => {
      return res
        .status(201)
        .json({status: 'Работа успешно добавлена'});
    }, err => {
      // обрабатываем  и отправляем
      res
        .status(404)
        .json({
          status: 'При добавление работы произошла ошибка: ' + err
        });
    });  
};