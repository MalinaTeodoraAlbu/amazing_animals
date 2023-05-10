const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();
const upload = require('../upload');


postRouter.get('/posts',
postController.getAllPosts
);

postRouter.get('/posts/:postid',
postController.getThePostByID
); 

postRouter.get('/users/:userid/posts',
postController.getAllPostByUserIS
); 

postRouter.delete('/posts/:id',
postController.detelePost
); 



postRouter.post('/posts', 
    upload.single('imagePaths', { name: "imagePaths"}),
    postController.insertPostIntoDB
);

postRouter.put('/posts/:id', 
    upload.single('imagePaths', { name: "imagePaths"}),
    postController.updatePost
);


module.exports = postRouter;
