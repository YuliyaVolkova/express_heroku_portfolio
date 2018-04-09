const express = require('express');
const router = express.Router();

const ctrlBlog = require('../controllers/blog');
const ctrlAvatar = require('../controllers/works');

router.get('/blog', ctrlBlog.getArticles); // READ
router.post('/blog', ctrlBlog.createArticle); // CREATE
router.put('/blog/:id', ctrlBlog.editArticle); // EDIT
router.delete('/blog/:id', ctrlBlog.deleteArticle); // DELETE

router.get('/works', ctrlAvatar.getAvatar);
router.post('/works', ctrlAvatar.setAvatar);

router.get('*', (req, res) => {
  res.status(404).json({msg: 'Not found', err: 404});
})

module.exports = router;