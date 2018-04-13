const mongoose = require('mongoose');

module.exports.getSlides = function (req, res) {
  const slider = mongoose.model('herokuslide');
  const mesDefault = [{
    title: 'В базе нет работ',
    technologies: 'Frontend',
    image: {}
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
  const Model = mongoose.model('herokuslide');
  let item = new Model({
    title: req.body.title,
    technologies: req.body.technologies,
    image: {
      data: req.body.image.data,
      contentType: req.body.image.contentType
    }
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