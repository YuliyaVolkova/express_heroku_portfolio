const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

mongoose.Promise = global.Promise;

const ctrlBlog = require('../api/controllers/blog');
//const ctrlSlider = require('../controllers/slider');
const ctrlSkills = require('../api/controllers/skills');
//const ctrlSlider = require('../../config/db');

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({message: 'Unauthorized', error: 401})
};

router.get('/blog', ctrlBlog.getArticles); // READ
router.post('/blog', isAuthenticated, ctrlBlog.createArticle); // CREATE
router.put('/blog/:id', isAuthenticated, ctrlBlog.editArticle); // EDIT
router.delete('/blog/:id', isAuthenticated, ctrlBlog.deleteArticle); // DELETE

router.get('/slider', ctrlSlider.getSlides);
router.post('/slider', ctrlSlider.addSlide);

router.get('/skill', ctrlSkills.getSkills); // READ
router.post('/skill', isAuthenticated, ctrlSkills.createSkill); // CREATE
router.put('/skill/:id', isAuthenticated, ctrlSkills.editSkill); // EDIT
router.delete('/skill/:id', isAuthenticated, ctrlSkills.deleteSkill); // DELETE


router.get('*', (req, res) => {
  res.status(404).json({msg: 'Not found', err: 404});
})

module.exports = router;

// Mongo URI
const mongoURI = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;
let gfs;
mongoose
  .connect(mongoURI)
  .catch(e => {
    console.error(e);
    throw e;
  });

mongoose.connection.on('connected', function() {
  console.log(`Mongoose default connection open ${mongoURI}`);
  const conn = mongoose.connection;
   // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });
//module.exports.upload = multer({ storage });

router.get('/slider', (req, res) => {
   console.log('in get sliders');
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      console.log('в базе нет записей');
      //res.render('index', { files: false });
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
      //res.render('index', { files: files });
      console.log(`в базе uploads найдены ${files}`);
    }
  });
};
// @route GET /
// @desc Loads form
/*router.get('/api/slider', (req, res) => {
  console.log('in get sliders');
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      console.log('в базе нет записей');
      //res.render('index', { files: false });
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
      //res.render('index', { files: files });
      console.log(`в базе uploads найдены ${files}`);
    }
  });
});*/

router.post('/slider', upload.single('file'), (req, res) => {
  // body...
  console.log(`post добавление слайда ${res.json({ file: req.file })}`);
    res.redirect('/admin');
};

// @route POST /upload
// @desc  Uploads file to DB
/*router.post('/slider', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  console.log(`post добавление слайда ${res.json({ file: req.file })}`);
  //res.redirect('/');
});*/

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});
require('../api/models/blog');
//require('../api/models/slider');
require('../api/models/skills');
require('../models/user');


var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({message: 'Unauthorized', error: 401})
};

router.get('/blog', ctrlBlog.getArticles); // READ
router.post('/blog', isAuthenticated, ctrlBlog.createArticle); // CREATE
router.put('/blog/:id', isAuthenticated, ctrlBlog.editArticle); // EDIT
router.delete('/blog/:id', isAuthenticated, ctrlBlog.deleteArticle); // DELETE

router.get('/slider', ctrlSlider.getSlides);
router.post('/slider', ctrlSlider.addSlide);

router.get('/skill', ctrlSkills.getSkills); // READ
router.post('/skill', isAuthenticated, ctrlSkills.createSkill); // CREATE
router.put('/skill/:id', isAuthenticated, ctrlSkills.editSkill); // EDIT
router.delete('/skill/:id', isAuthenticated, ctrlSkills.deleteSkill); // DELETE


router.get('*', (req, res) => {
  res.status(404).json({msg: 'Not found', err: 404});
})

module.exports = router;