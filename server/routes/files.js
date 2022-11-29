var express = require('express');
var router = express.Router();
var sql = require('../config/database.js');
var passport = require('passport')
const multer = require('multer');
var path = require('path');
const fs = require('fs');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

router.post('/avatar/', upload.single('avatarFile'), function(req, res, next) {
    console.log("hey")
    console.log(req.file)
    console.log(req.body)
    let file = req.file
    let oldPath = __dirname + '/../'+file.path
    let newPath = __dirname  + '/../files/avatar/'
    let id =  req.body.user
    console.log(id)

    newPath = newPath + id+'.'+file.mimetype.split('/')[1];
    console.log(newPath)
    console.log(oldPath)

    //if (!fs.existsSync(newPath)){
    //  fs.mkdirSync(newPath);
    //}
    
    fs.copyFile(oldPath, newPath, function(err){
        if(err){ console.log("FSSSS")}
        console.log("RRR")
        fs.unlinkSync(oldPath);
        res.jsonp("Ficheiro gravado com sucesso!")
      })
        
});

router.get('/avatar/:id', function(req, res, next) {
  console.log(__dirname  + '/../files/avatar/'+req.params.id+'.jpeg')
  res.sendFile(path.resolve(__dirname  + '/../files/avatar/'+req.params.id+'.jpeg')); 
  // aqui não é só id -> id + extensão
});

module.exports = router;