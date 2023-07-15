const express = require('express');
const advertisingController = require('../controllers/advertisingController');

const advertisingRouter = express.Router();
const upload = require('../upload');

advertisingRouter.get('/advertising',
advertisingController.getAllAdvertising);

advertisingRouter.get('/advertising/:id',
advertisingController.getAdverting);

advertisingRouter.post('/advertising',
upload.single('imagePaths', { name: "imagePaths"}),
advertisingController.insertOneInDB);

advertisingRouter.put('/advertising/:id',
upload.single('imagePaths', { name: "imagePaths"}),
advertisingController.updateAdvertising);

module.exports = advertisingRouter;