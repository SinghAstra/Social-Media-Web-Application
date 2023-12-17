const Post = require('../models/post')

const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
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

const updatePost = async(req,res) => {
    try {
        const {id} = req.params;
        const {title,message,creator,tags,selectedFile} = req.body;
        const updatedPost = await Post.findByIdAndUpdate(id,{title,message,creator,tags,selectedFile},{new:true})
        res.status(201).json({data:updatedPost})
    } catch (error) {
        res.status(500).json({message:error})
    }
}

module.exports = {getPosts,createPost,updatePost}