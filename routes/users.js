const express = require('express');

const jwt =require('jsonwebtoken');
const Joi =require('joi');


const router = express.Router();
const { Op } = require('sequelize'); 
const {User} = require('../models');
    

//회원가입
router.post('/signup', async(req,res)=>{
    try{
        const {nickname, password, confirm} = req.body;
        console.log('1111',nickname,password,confirm)
        if(password !==confirm){
            console.log('22222',password,confirm);
            res.status(400).send({
                errorMessage : "비밀번호를 확인해주세요."
            });       
            return;
        }
        else if (password === nickname){
            console.log('333',password,nickname)
            res.status(400).send({
                errorMessage : "아이디와 비밀번호를 다르게 설정해주세요."
            })
            
            return;
        }
        //닉네임이 같은지 알아보기 위해서
        const existuser = await User.findOne({
            where:{
                nickname,
            },
        });
        if(existuser){
            res.status(400).send({
                errorMessage : "이미 사용 중인 닉네임입니다."
            })
            return;
        }
        await User.create({nickname,password});
        res.status(201).send({
            Message : "회원가입을 축하드립니다."
        })
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: "형식을 확인해주세요"
        })
    }
});

//로그인
router.post('/login', async(req,res)=>{
    try{
        const {nickname, password} = req.body;
        const user = await User.findOne({
            where:{
                nickname,
            },
        });
        
        if(!user || password !==user.password){
            res.status(400).send({
                errorMessage : "닉네임 또는 패스워드를 확인해주세요."
            })
            return;
        }
        const token = jwt.sign({userId:user.userId}, "hyunjin");  //이부분이 ({userId =user.nickname})이 안되는 이유?
        console.log();
        console.log(user.nickname);
        res.send({
            token
        });
    }catch(err){
        console.log(err);
        res.status(400).send({
            errorMessage: "형식을 확인해주세요"
        })
    }
});

module.exports = router;
