const express = require('express');
const app = express();
const port =3000;
// const connect = require ('./schemas');
// connect();

const UserRouter =require('./routes/users');
const PostRouter =require('./routes/posts');
const CommentRouter = require('./routes/comments');
// const LikeRouter = require('./routes/likes');
app.use(express.json());
app.use("/api",[UserRouter]);
app.use("/api",[PostRouter]);
app.use("/api",[CommentRouter]);
// app.use("/api",[LikeRouter]);

app.listen(port,()=>{
    console.log('서버가 실행되었습니다.');
});