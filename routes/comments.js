const express = require ('express');

const jwt =require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');

const {Op} = require('sequelize');
const {User,Comment} = require('../models');


const router = express.Router();

router.post('/comments/:postId', authMiddleware, async(req,res)=>{
    try{
        const user = res.locals.user;
        console.log('123131231231231',res.locals.user)
        const {postId} = req.params;
        const {comment} = req.body;
        const comments = await Comment.create
        ({userId:user.userId,nickname:user.nickname,postId,comment})

        console.log('abcabcaasdasaaaaaa',user,postId,comments)
        console.log('4')
        res.status(201).send({
            message: '댓글 작성에 성공하였습니다.'
        })
     
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: "댓글 작성에 실패하였습니다."
        })
    }
});

router.get('/comments/:postId',  async(req,res)=>{
    const {postId}=req.params;
    const comments = await Comment.findAll({
        where :
            {postId:postId},
        })
    const result = comments.map((comment)=>{return{
            commentId:comment.commentId,
            userId:comment.userId,
            nickname : comment.nickname,
            createdAt:comment.createdAt,
            updatedAt:comment.updatedAt
}})
    res.status(200).send({data:result})
    
})
//댓글 수정
router.put('/comments/:commentId', authMiddleware,async(req,res)=>{
    try{
        console.log('000000000000000000',res.locals.user)
        const {userId}=res.locals.user;
        console.log('1111111111',userId)
        const {commentId}=req.params;
        const {comment}=req.body;
        const comments = await Comment.findOne({
            where:{
                commentId
            }
        })
        console.log('222222222222',comments.userId)
        if(userId !== comments.userId)
        {
            res.status(400).send({
                message: '작성자가 일치하지 않습니다.'
            })
        }
            await Comment.update({
                comment},{
                    where: 
                    {userId,commentId}
                })
                res.send({message:"댓글 수정에 성공하였습니다."})              
        
    }catch(err){
    console.log(err);
    res.status(400).send({
        errorMessage: "댓글 수정에 실패하였습니다."
    })
}
})

router.delete('/comments/:commentId',authMiddleware, async(req,res)=>{
try{
    const {userId} = res.locals.user;
    const {commentId}=req.params;
    const comment = await Comment.findOne({
        where:{
            commentId
        }
    })
    if(userId ===comment.userId){
        await Comment.destroy({
            where:{
                commentId
            }
        })
        
        }
        res.status(200).send({
            message:'댓글이 삭제되었습니다.'
    })
}catch(err){
    console.log(err);
    res.status(400).send({
        errorMessage: "댓글 삭제에 실패하였습니다."
    })
}
})


module.exports = router;