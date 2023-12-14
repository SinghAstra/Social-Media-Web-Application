const Post = require('../models/post')

const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find({});
        res.status(200).json({data:posts})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const createPost = async(req,res) => {
    try {
        const {title,message,creator,tags,selectedFile} = req.body;
        const post = new Post({title,message,creator,tags,selectedFile})
        await post.save();
        res.status(201).json({data:post})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

module.exports = {getPosts,createPost}