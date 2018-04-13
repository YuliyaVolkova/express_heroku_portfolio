const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config');

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

mongoose.Promise = global.Promise;

// Mongo URI
const mongoURI = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;

//const conn = mongoose.createConnection(mongoURI);
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
  console.log(gfs);
});

// Init gfs
//let gfs;

/*conn.once('open', () => {
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


// @route GET /
// @desc Loads form
router.get('/slider', (req, res) => {
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
});

// @route POST /upload
// @desc  Uploads file to DB
router.post('/slider', upload.single('file'), (req, res) => {
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