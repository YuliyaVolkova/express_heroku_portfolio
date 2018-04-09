const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/homepage');
const ctrlBlog = require('../controllers/blog');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');
const ctrlAbout = require('../controllers/about');
const ctrlWorks = require('../controllers/works');

router.get('/', ctrlHome.index);

router.get('/blog', ctrlBlog.blog);

router.get('/about', ctrlAbout.about);

router.get('/works', ctrlWorks.works);
router.post('/mail', ctrlWorks.sendEmail);

router.get('/login', ctrlLogin.login);
router.post('/login', ctrlLogin.auth);

router.get('/admin', ctrlAdmin.admin);

module.exports = router;