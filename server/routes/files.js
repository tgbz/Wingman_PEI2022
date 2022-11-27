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

    let file = req.file
    let oldPath = __dirname + '/../'+file.path
    let newPath = __dirname  + '/../files/avatar/'
    let id =  req.body.idUser
    console.log(id)

    newPath = newPath + id;
    console.log(newPath)
    console.log(oldPath)

    if (!fs.existsSync(newPath)){
      fs.mkdirSync(newPath);
  }
    
    fs.copyFile(oldPath, newPath, function(err){
        if(err){ console.log("FSSSS")}
        console.log("RRR")
        fs.unlinkSync(oldPath);
        res.jsonp("Ficheiro gravado com sucesso!")
      })
        
});

router.get('/avatar/:id', function(req, res, next) {
        res.sendFile(path.resolve(__dirname  + '/../files/avatar/'+req.params.id));
 
});

module.exports = router;