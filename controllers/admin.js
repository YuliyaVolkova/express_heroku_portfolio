const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const http = require('request');
var mongoose = require("mongoose");
var grid = require("gridfs-stream");
const config = require('../config/config.json');
//const apiServer = config.server.path;


module.exports.admin = function (req, res) {
  res.render('my_pages/admin', {
    title: 'Admin panel'
  });
};

//mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`);
var conn = mongoose.connection;

module.exports.uploadSlide = function (req, res) {
  let form = new formidable.IncomingForm();
  let upload = 'public/upload';

  //form.uploadDir = __dirname+"/Uploads";
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }
  //form.uploadDir = __dirname+"/Uploads";
  form.uploadDir = path.join(process.cwd(), upload);
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
      console.log(fields.title, fields.technologies, fields.photo);
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
        if (!fields.photo) {
          fs.unlink(files.photo.path);
          return res.json({msg: 'Не выбран файл для загрузки!', status: 'Error'});
        }
        if (!err) {
            console.log('Files Uploaded: ' + files.photo)
            grid.mongo = mongoose.mongo;
            var gfs = grid(conn.db);
            var writestream = gfs.createWriteStream({
                filename: files.photo.name
            });
            fs.createReadStream(files.photo.path).pipe(writestream);
        }
    });
    form.on('end', function () {
        res.send('Completed ... go check fs.files & fs.chunks in mongodb');
    });



 /* let fileName;  
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }
  form.uploadDir = path.join(process.cwd(), upload);
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
  })*/
}