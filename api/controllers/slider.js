const mongoose = require('mongoose');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

module.exports.getSlides = function (req, res) {
  let conn = mongoose.connection;
  let gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  const mesDefault = [{
    title: 'В базе нет работ',
    technologies: 'Frontend',
    image: {}
  }];
  gfs.files.find().toArray((err, files) => {

    if (!files || files.length === 0) {
      res
          .status(200)
          .json({dataArr: mesDefault});
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res
          .status(200)
          .json({dataArr: mesDefault});
      console.log(res.json(files));
    }
  });
};

/*module.exports.getSlides = function (req, res) {
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
};*/
/*module.exports.addSlide = function (req, res) {
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
};*/
