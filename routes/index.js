const express = require('express');
const router = express.Router();
const config = require('../config/config.json');

const MongoClient = require('mongodb').MongoClient,
	ObjectId = require('mongodb').ObjectId,
	fs = require('fs-extra'),
   // Your mongodb or mLabs connection string
	url = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`,
	multer = require('multer'),
	util = require('util'),
	upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'});

const ctrlHome = require('../controllers/homepage');
const ctrlBlog = require('../controllers/blog');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');
const ctrlAbout = require('../controllers/about');
const ctrlWorks = require('../controllers/works');

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

router.get('/', ctrlHome.index);

router.get('/blog', ctrlBlog.blog);

router.get('/about', ctrlAbout.about);

router.get('/works', ctrlWorks.works);
router.post('/mail', ctrlWorks.sendEmail);

router.get('/login', ctrlLogin.login);
router.post('/login', ctrlLogin.auth);

router.get('/admin', isAuthenticated, ctrlAdmin.admin);
//router.post('/admin/slider', isAuthenticated, upload.single('picture'), ctrlAdmin.uploadSlide);

module.exports = router;

  
// Form POST action handler
router.post('/admin/slider', upload.single('photo'), function (req, res){ 
	 console.log('in function post photo');
	 
if (req.file == null) {
   // If Submit was accidentally clicked with no file selected...
  res.render('my_pages/admin', { title:'Please select a picture file to submit!' });
} else { 
MongoClient.connect(url, function(err, db){
   // read the img file from tmp in-memory location
   var newImg = fs.readFileSync(req.file.path);
   // encode the file as a base64 string.
   var encImg = newImg.toString('base64');
   // define your new document
   var newItem = {
      title: req.body.title,
      technologies: req.body.title,
      contentType: req.file.mimetype,
      size: req.file.size,
      img: Buffer(encImg, 'base64')
   };
db.collection('yourcollectionname')
   .insert(newItem, function(err, result){
   if (err) { console.log(err); };
      var newoid = new ObjectId(result.ops[0]._id);
      fs.remove(req.file.path, function(err) {
         if (err) { console.log(err) };
         res.render('my_pages/admin', {title:'Thanks for the Picture!'});
         });
      });
   });
   };
});