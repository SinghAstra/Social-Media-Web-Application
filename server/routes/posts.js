const express = require('express');
const router = express.Router();
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts');

router.get('/',getPosts)
router.post('/',createPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.put('/:id/likePost',likePost);

module.exports = router;
