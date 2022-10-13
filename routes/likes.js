// const express = require('express');

// const authMiddleware = require('../middlewares/auth-middleware');


// const {Op} = require('sequelize');
// const {User,Post,Comment} = require('../models');

// const router = express.Router();
// router.get('/posts/like', async(req,res)=>{
//     const posts = await Post.find({})
//     const likes = await Like.find({likes})
//     .select(nickname,title,likes)
// })

// router.put('/posts/:postId/like', authMiddleware, async(req,res)=>{
//     try{
//     const {userId} = res.locals.user;
//     const {postId} = req.params;
//     const likes = await Like.findOne({
//         where:
//         {
//             userId,postId
//         }})
//     if(likes){
//         await Like.deleteOne({postId});
//         await Post.updateOne({postId},{$inc:{totalLike: -1}});
//         res.status(200).send({
//             message : "좋아요를 취소했습니다."
//         });
//     }
//     if(!likes){
//         const like = new Like({postId,userId});
//         await like.save();
//         await Posts.updateOne({postId},{$inc:{totalLike: 1}});
//         res.status(201).send({
//             message:'좋아요를 등록했습니다.'});
//     }
//     }catch(error){
//         res.status(400).send({
//             errorMessage:'에러'
//         });
//     }
// });


// module.exports = router;