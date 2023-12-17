const express = require('express');
const router = express.Router();
const { getPosts, createPost, updatePost } = require('../controllers/posts');

router.get('/',getPosts)
router.post('/',createPost);
router.put('/:id',updatePost);

module.exports = router;
