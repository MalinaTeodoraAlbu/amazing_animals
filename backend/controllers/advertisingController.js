const { ObjectId } = require('mongodb');
const Advertising = require('../model/Advertising')
const {AdvertisingCollection} = require('../routers/mainRouter')

const fs = require('fs');
const path = require('path');

const deleteImages = (imagePaths) => {
    imagePaths.split(',').forEach((path) => {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Deleted file ${path}`);
        }
      });
    });
};

const getAdverting = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        console.log(id)
        const adv = await AdvertisingCollection.findOne({_id : id});
        if(adv){
            res.status(200).send(adv);
        } else {
          res.status(404).send('Animal not found');
        }
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
    };

//get all
const getAllAdvertising = async ( req, res) =>{
    try {
    const advertisings = await AdvertisingCollection.find().toArray();
    res.status(200).send(advertisings);
    }catch(err){
    res.status(500).send(err)
    }
}

const insertOneInDB = async (req, res) => {
    try {
        const advertising = new Advertising({
            content: req.body.content,
            location: req.body.location,
            category: req.body.category,
            datePosted: req.body.datePosted,
            userid: new ObjectId(req.body.userid),
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        
        if(req.file){
            let pathImage = (req.file.path).replaceAll("\\",'/');
            advertising.imagePaths = pathImage
        }
        const result = await AdvertisingCollection.insertOne(advertising)
        await advertising.save();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

}

const updateAdvertising = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const advertising = await AdvertisingCollection.findOne({_id : id})
        if(!advertising) {
            return res.status(404).json({error : 'Old advertising not found'});
        }

        const newadvertising = new Advertising({
            _id: id, 
            content: req.body.content,
            location: req.body.location,
            category: req.body.category,
            datePosted: req.body.datePosted,
            userid: new ObjectId(req.body.userid),
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        console.log(newadvertising)
        if(req.file){
            let pathImage = (req.file.path).replaceAll("\\",'/');
            newadvertising.imagePaths = pathImage
            if(advertising.imagePaths){
                deleteImages(advertising.imagePaths)
            }
        }
        else{
            newadvertising.imagePaths = advertising.imagePaths;
        }

        const result = await AdvertisingCollection.findOneAndUpdate(
            {_id : id},
            {$set : newadvertising},
            {returnDocument : "after"},
            {returnOriginal : false}
        );
        if(!result.value){
            return res.status(404).send("Advertising not found")
        }
        res.status(200).send(result.value)
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

}


module.exports = {getAllAdvertising , insertOneInDB , updateAdvertising,getAdverting}