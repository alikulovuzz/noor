const express = require('express');
const router = express.Router();
const multer = require('multer');
const img=require('../db/models/img')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString())
    }
})

var upload = multer({ storage: storage })
router.post('/upload', upload.single('myFile'), async (req, res, next) => {
    const file = req.file
    console.log(file)    
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next("hey error")
    }

    const strFile=file.mimetype;
    const imagepost = new img({
        image: 'https://noor98.herokuapp.com/'+file.path+'.'+strFile.substring(strFile.lastIndexOf('/') + 1)
    })
    const savedimage = await imagepost.save()
    res.json(savedimage)

})

router.get('/image', async (req, res) => {
    const image = await img.find()
    res.json(image)

})
module.exports = router;
