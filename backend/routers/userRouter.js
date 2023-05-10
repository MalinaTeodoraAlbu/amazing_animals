const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();
const upload = require('../upload');


userRouter.get('/users',
    userController.getAllUsersFromDB
);

userRouter.get('/users/:userid',
   userController.getUserFromDBById
); 


userRouter.post('/users', 
    upload.single('imagePaths', { name: "imagePaths"}),
    userController.insertUserIntoDB
);

userRouter.put('/users/:id', 
    upload.single('imagePaths', { name: "imagePaths"}),
    userController.updateUser
);


module.exports = userRouter;
