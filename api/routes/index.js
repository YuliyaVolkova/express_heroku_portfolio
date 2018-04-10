const express = require('express');
const router = express.Router();

const ctrlBlog = require('../controllers/blog');
const ctrlSlider = require('../controllers/slider');
const ctrlSkills = require('../controllers/skills');

router.get('/blog', ctrlBlog.getArticles); // READ
router.post('/blog', ctrlBlog.createArticle); // CREATE
router.put('/blog/:id', ctrlBlog.editArticle); // EDIT
router.delete('/blog/:id', ctrlBlog.deleteArticle); // DELETE

router.get('/slider', ctrlSlider.getSlides);
router.post('/slider', ctrlSlider.addSlide);

router.get('/skill', ctrlSkills.getSkills); // READ
router.post('/skill', ctrlSkills.createSkill); // CREATE
router.put('/skill/:id', ctrlSkills.editSkill); // EDIT
router.delete('/skill/:id', ctrlSkills.deleteSkill); // DELETE


router.get('*', (req, res) => {
  res.status(404).json({msg: 'Not found', err: 404});
})

module.exports = router;