const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const http = require('request');
const config = require('../config/config.json');
const apiServer = config.server.path;
//const multer = require('multer');

module.exports.admin = function (req, res) {
  res.render('my_pages/admin', {
    title: 'Admin panel'
  });
};

module.exports.uploadSlide = function (req, res) {
  let form = new formidable.IncomingForm();
  //let upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});
  /*let fileName;  
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }*/
  //form.uploadDir = path.join(process.cwd(), upload);
  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.json({msg: 'Не удалось загрузить картинку', status: 'Error'});
    }
    if (!fields.title) {
      fs.unlink(files.photo.path);
      return res.json({msg: 'Не указано название работы!', status: 'Error'});
    }
    if (!fields.technologies) {
      fs.unlink(files.photo.path);
      return res.json({msg: 'Не указаны технологии!', status: 'Error'});
    }
    if (!fields.file) {
      fs.unlink(files.photo.path);
      return res.json({msg: 'Не выбран файл для загрузки!', status: 'Error'});
    }

    let newImg = fs.readFileSync(fields.file.path);
    var encImg = newImg.toString('base64');
      const pathApi = config.server.slider;
      const requestOptions = {
        url: apiServer + pathApi,
        method: 'POST',
        json: {
          title: fields.title,
          technologies: fields.technologies,
          image: {
            data: Buffer(encImg, 'base64'),
            contentType: fields.file.mimetype,
          }
        }
      };

      http(requestOptions, function (error, response, body) {
        if (error) {
          return res.json({msg: 'Картинка не сохранилась в БД ' + error, status: 'Error'});
        }
        fs.remove(fields.file.path, function(err) {
         if (err) { console.log(err) };
        res.json({msg: 'Картинка успешно загружена', status: 'Ok'});
      });
    });  
  })
}