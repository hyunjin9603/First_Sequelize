const express = require('express');

const jwt =require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware');


const {Op} = require('sequelize');
const {Post} = require('../models');
const router = express.Router();


//게시글 생성
router.post('/posts',authMiddleware, async(req,res)=>{

    try{
        //res.locals.user { userId :5123124, nickname: '찐빵', password: 4t35}
        const { userId, nickname } = res.locals.user;
        const {title, content} = req.body;
        await Post.create
        ({userId,nickname,title,content})
        res.status(201).send({
            message: '게시글 작성에 성공하였습니다.'
        });
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: error
        })
    }
});

//게시글 조회
router.get('/posts', async(req,res)=>{
    try{
        const posts = await Post.findAll()
        const result=[]
        for (const post of posts){
            result.push({
                postId:post.postId,
                nickname:post.nickname,
                title:post.title, 
                createdAt:post.createdAt,
                updatedAt:post.updatedAt})
        };
        return res.send({result})    
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 조회에 실패하였습니다."
        })
    }    
})

//게시글 상세 조회
router.get('/posts/:postId',authMiddleware, async(req,res)=>{
    try{
        const{userId} = res.locals.user;
        const{postId} = req.params;
        const post =await Post.findOne({
            where:{
                postId
            }
            })
        return res.send({post});
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 조회에 실패하였습니다."
        })
    }
})

//게시글 수정
router.put('/posts/:postId',authMiddleware, async(req,res)=>{
    try{
        const user = res.locals.user; // res.locals.user = {_ userId: 6345532511d047aa22b534ae, }
        const{postId} = req.params;
        const{title,content} = req.body;
        const post = await Post.findOne({
            where :{
                postId
            }
        });
        if(user.nickname === post.nickname)
        {
            await Post.update({
                title,content},{
                where :
                    {postId}
                })
                
                return res.send({message:"게시글 수정에 성공하였습니다."})              
        }
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 수정에 실패하였습니다."
        })
    }
})

//게시글 삭제
router.delete('/posts/:postId',authMiddleware, async(req,res)=>{
    try{
        const user = res.locals.user;
        console.log(user)
        const {postId} =req.params;
        const post = await Post.findOne({_id:postId}) // find 전체를 다 불러오는 애라서 기본적으로 배열로 들어와요
        // [ { _id: 231, nickname: '핫식스', tile , contet} ]
        console.log(post)
        if(user.nickname === post.nickname){    
            await Post.destroy({
                where:{
                    postId}
                })
        }
        res.status(200).send({
            message : "게시글을 삭제하였습니다."
        })
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: "게시글 삭제에 실패하였습니다."
        })
    }
})
module.exports = router;