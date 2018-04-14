const express = require('express');
const router = express.Router();

const ctrlBlog = require('../controllers/blog');
const ctrlSlider = require('../controllers/slider');
const ctrlSkills = require('../controllers/skills');

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
//router.post('/slider', ctrlSlider.addSlide);

router.get('/skill', ctrlSkills.getSkills); // READ
router.post('/skill', isAuthenticated, ctrlSkills.createSkill); // CREATE
router.put('/skill/:id', isAuthenticated, ctrlSkills.editSkill); // EDIT
router.delete('/skill/:id', isAuthenticated, ctrlSkills.deleteSkill); // DELETE


router.get('*', (req, res) => {
  res.status(404).json({msg: 'Not found', err: 404});
})

module.exports = router;